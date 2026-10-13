import { bundledLanguages, codeToHtml, type BundledLanguage } from 'shiki/bundle/web'

function isBundledLanguage(language: string): language is BundledLanguage {
  return Object.prototype.hasOwnProperty.call(bundledLanguages, language)
}

export function highlightCode(code: string, language: string) {
  return codeToHtml(code, {
    lang: isBundledLanguage(language) ? language : 'text',
    themes: { light: 'github-light', dark: 'github-dark' },
  })
}
