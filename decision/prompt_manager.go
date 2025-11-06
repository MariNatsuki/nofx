package decision

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"sync"
)

// PromptTemplate 系统提示词模板
type PromptTemplate struct {
	Name    string // 模板名称（文件名，不含扩展名）
	Content string // 模板内容
}

// PromptManager 提示词管理器
type PromptManager struct {
	templates map[string]*PromptTemplate
	mu        sync.RWMutex
}

var (
	// globalPromptManager 全局提示词管理器
	globalPromptManager *PromptManager
	// promptsDir 提示词文件夹路径（延迟初始化）
	promptsDir string
	// promptsDirOnce 用于确保 promptsDir 只初始化一次
	promptsDirOnce sync.Once
)

// resolvePromptsDir 解析提示词目录路径（尝试多个位置）
// 优先级顺序：
// 1. /app/prompts (Railway/Docker 生产环境)
// 2. ./prompts (当前工作目录 - 本地开发)
// 3. 相对于可执行文件的路径
// 4. 通过查找 go.mod 或 config.json 检测工作区根目录
func resolvePromptsDir() string {
	promptsDirOnce.Do(func() {
		candidates := []string{
			"/app/prompts",                    // Railway/Docker 生产环境
			"prompts",                         // 当前工作目录
		}

		// 尝试获取可执行文件路径
		if exePath, err := os.Executable(); err == nil {
			exeDir := filepath.Dir(exePath)
			candidates = append(candidates, filepath.Join(exeDir, "prompts"))
		}

		// 尝试通过查找 go.mod 或 config.json 检测工作区根目录
		cwd, err := os.Getwd()
		if err == nil {
			// 从当前目录向上查找工作区根目录
			dir := cwd
			for i := 0; i < 10; i++ { // 最多向上查找10层
				if _, err := os.Stat(filepath.Join(dir, "go.mod")); err == nil {
					candidates = append(candidates, filepath.Join(dir, "prompts"))
					break
				}
				if _, err := os.Stat(filepath.Join(dir, "config.json")); err == nil {
					candidates = append(candidates, filepath.Join(dir, "prompts"))
					break
				}
				parent := filepath.Dir(dir)
				if parent == dir {
					break // 已到根目录
				}
				dir = parent
			}
		}

		// 尝试每个候选路径
		var triedPaths []string
		found := false
		for _, candidate := range candidates {
			triedPaths = append(triedPaths, candidate)
			if info, err := os.Stat(candidate); err == nil && info.IsDir() {
				// 检查目录中是否有 .txt 文件
				if files, err := filepath.Glob(filepath.Join(candidate, "*.txt")); err == nil && len(files) > 0 {
					promptsDir = candidate
					log.Printf("✓ 找到提示词目录: %s", candidate)
					found = true
					break
				}
			}
		}

		// 如果所有路径都失败，使用默认值（用于错误消息）
		if !found {
			promptsDir = "prompts"
			log.Printf("⚠️  未找到提示词目录，尝试的路径: %v", triedPaths)
			log.Printf("⚠️  将使用默认路径: %s (如果目录不存在，模板加载将失败)", promptsDir)
		}
	})

	return promptsDir
}

// init 包初始化时加载所有提示词模板
func init() {
	globalPromptManager = NewPromptManager()
	resolvedDir := resolvePromptsDir()
	if err := globalPromptManager.LoadTemplates(resolvedDir); err != nil {
		log.Printf("⚠️  加载提示词模板失败: %v", err)
	} else {
		log.Printf("✓ 已加载 %d 个系统提示词模板", len(globalPromptManager.templates))
	}
}

// NewPromptManager 创建提示词管理器
func NewPromptManager() *PromptManager {
	return &PromptManager{
		templates: make(map[string]*PromptTemplate),
	}
}

// LoadTemplates 从指定目录加载所有提示词模板
func (pm *PromptManager) LoadTemplates(dir string) error {
	pm.mu.Lock()
	defer pm.mu.Unlock()

	// 检查目录是否存在
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		return fmt.Errorf("提示词目录不存在: %s", dir)
	}

	// 扫描目录中的所有 .txt 文件
	files, err := filepath.Glob(filepath.Join(dir, "*.txt"))
	if err != nil {
		return fmt.Errorf("扫描提示词目录失败: %w", err)
	}

	if len(files) == 0 {
		log.Printf("⚠️  提示词目录 %s 中没有找到 .txt 文件", dir)
		return nil
	}

	// 加载每个模板文件
	for _, file := range files {
		// 读取文件内容
		content, err := os.ReadFile(file)
		if err != nil {
			log.Printf("⚠️  读取提示词文件失败 %s: %v", file, err)
			continue
		}

		// 提取文件名（不含扩展名）作为模板名称
		fileName := filepath.Base(file)
		templateName := strings.TrimSuffix(fileName, filepath.Ext(fileName))

		// 存储模板
		pm.templates[templateName] = &PromptTemplate{
			Name:    templateName,
			Content: string(content),
		}

		log.Printf("  📄 加载提示词模板: %s (%s)", templateName, fileName)
	}

	return nil
}

// GetTemplate 获取指定名称的提示词模板
func (pm *PromptManager) GetTemplate(name string) (*PromptTemplate, error) {
	pm.mu.RLock()
	defer pm.mu.RUnlock()

	template, exists := pm.templates[name]
	if !exists {
		log.Printf("📝 尝试获取提示词模板 '%s': 不存在", name)
		return nil, fmt.Errorf("提示词模板不存在: %s", name)
	}

	log.Printf("📝 获取提示词模板: %s (文件: %s.txt)", name, name)
	return template, nil
}

// GetAllTemplateNames 获取所有模板名称列表
func (pm *PromptManager) GetAllTemplateNames() []string {
	pm.mu.RLock()
	defer pm.mu.RUnlock()

	names := make([]string, 0, len(pm.templates))
	for name := range pm.templates {
		names = append(names, name)
	}

	return names
}

// GetAllTemplates 获取所有模板
func (pm *PromptManager) GetAllTemplates() []*PromptTemplate {
	pm.mu.RLock()
	defer pm.mu.RUnlock()

	templates := make([]*PromptTemplate, 0, len(pm.templates))
	for _, template := range pm.templates {
		templates = append(templates, template)
	}

	return templates
}

// ReloadTemplates 重新加载所有模板
func (pm *PromptManager) ReloadTemplates(dir string) error {
	pm.mu.Lock()
	pm.templates = make(map[string]*PromptTemplate)
	pm.mu.Unlock()

	return pm.LoadTemplates(dir)
}

// === 全局函数（供外部调用）===

// GetPromptTemplate 获取指定名称的提示词模板（全局函数）
func GetPromptTemplate(name string) (*PromptTemplate, error) {
	return globalPromptManager.GetTemplate(name)
}

// GetAllPromptTemplateNames 获取所有模板名称（全局函数）
func GetAllPromptTemplateNames() []string {
	return globalPromptManager.GetAllTemplateNames()
}

// GetAllPromptTemplates 获取所有模板（全局函数）
func GetAllPromptTemplates() []*PromptTemplate {
	return globalPromptManager.GetAllTemplates()
}

// ReloadPromptTemplates 重新加载所有模板（全局函数）
func ReloadPromptTemplates() error {
	resolvedDir := resolvePromptsDir()
	return globalPromptManager.ReloadTemplates(resolvedDir)
}
