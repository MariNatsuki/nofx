import translate from 'google-translate-api-x'
import type { Language } from '../i18n/translations'

/**
 * Maps application language codes to Google Translate language codes
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
 * Translates text to the target language using Google Translate API
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

    // Auto-detect source language and translate to target
    // Use client: 'gtx' to fix 403 Forbidden errors (as per package documentation)
    const result = await translate(text, {
      to: targetLangCode,
      client: 'gtx',
    } as any)

    return result.text || text
  } catch (error) {
    console.error('Translation error:', error)
    // Return original text on error
    return text
  }
}
