import type { AnchorItemData } from '@fex-design/solid/ui/anchor'

export function collectToc(article: HTMLElement): readonly AnchorItemData<string>[] {
  const items: Array<AnchorItemData<string> & { children?: AnchorItemData<string>[] }> = []
  let section: (typeof items)[number] | undefined
  let subsection: (typeof items)[number] | undefined
  const elements = article?.querySelectorAll<HTMLElement>('h2[id], h3[id], [data-toc-item]') ?? []
  for (const element of elements) {
    const isSection = element.tagName === 'H2'
    const isSubsection = element.tagName === 'H3' && !element.hasAttribute('data-toc-item')
    const key = element.id
    const item = {
      key,
      title: element.dataset.tocTitle ?? element.textContent?.trim() ?? '',
      target: `#${key}`,
    }
    if (isSection) {
      section = { ...item, children: [] }
      items.push(section)
      subsection = undefined
    } else if (isSubsection && section && key) {
      subsection = { ...item, children: [] }
      section.children!.push(subsection)
    } else if (subsection && key) {
      subsection.children!.push(item)
    } else if (section && key) {
      section.children!.push(item)
    }
  }
  return items
}
