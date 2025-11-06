import type { Language } from '../i18n/translations'

/**
 * Maps application language codes to translation API language codes
 */
function mapLanguageCode(lang: Language): string {
  switch (lang) {
    case 'zh':
      return 'zh-CN'
    case 'en':
      return 'en'
    default:
      return 'en'
  }
}

/**
 * Translates text to the target language using backend translation API
 * @param text - The text to translate
 * @param targetLanguage - Target language ('en' | 'zh')
 * @returns Promise resolving to translated text, or original text on error
 */
export async function translateText(
  text: string,
  targetLanguage: Language
): Promise<string> {
  if (!text || text.trim().length === 0) {
    return text
  }

  try {
    const targetLangCode = mapLanguageCode(targetLanguage)

    // Call backend translation API
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        to: targetLangCode,
      }),
    })

    if (!response.ok) {
      throw new Error(`Translation API returned status: ${response.status}`)
    }

    const data = await response.json()
    return data.text || text
  } catch (error) {
    console.error('Translation error:', error)
    // Return original text on error
    return text
  }
}
