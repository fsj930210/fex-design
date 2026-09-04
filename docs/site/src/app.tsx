import { createEffect, createMemo, createSignal, For, Show } from 'solid-js'
import { Anchor, type AnchorItemData } from '@fex-design/solid/ui/anchor'
import { frameworks } from '@fex-design/docs-shared/model'
import { isDocumentedComponent } from './data'
import { getComponentDocument, getDocumentSlugs } from './content'
import { MdxDocument } from './mdx-document'
import type { Framework } from './types'

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const routePath = location.pathname.startsWith(basePath)
  ? location.pathname.slice(basePath.length)
  : location.pathname
const parts = routePath.split('/').filter(Boolean)
const pathFramework = parts[0] as Framework
const initialFramework = frameworks.includes(pathFramework) ? pathFramework : 'solid'
const siteHref = (path = '') => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export function App() {
  const [framework, setFramework] = createSignal<Framework>(initialFramework)
  const [slug, setSlug] = createSignal(parts[2] ?? 'button')
  const [layer] = createSignal<'primitive' | 'ui'>(
    (new URLSearchParams(location.search).get('layer') as 'primitive' | 'ui') ?? 'ui',
  )
  const document = createMemo(() => getComponentDocument(slug()))
  const [toc, setToc] = createSignal<readonly AnchorItemData<string>[]>([])
  let article!: HTMLElement
  // MDX heading ids 由 rehype-slug 生成；文档变化后从真实 DOM 同步目录。
  createEffect(() => {
    document()
    layer()
    queueMicrotask(() => setToc(collectToc(article)))
  })
  const navigate = (nextFramework: Framework, nextSlug: string) => {
    setFramework(nextFramework)
    setSlug(nextSlug)
    history.replaceState(
      null,
      '',
      siteHref(`${nextFramework}/components/${nextSlug}?layer=${layer()}`),
    )
    scrollTo({ top: 0 })
  }
  return (
    <div class="grid min-h-screen grid-cols-[220px_minmax(0,900px)_220px] grid-rows-[64px_1fr] justify-center bg-background font-sans text-foreground max-[1000px]:grid-cols-[190px_minmax(0,1fr)] max-[720px]:block">
      <header class="sticky top-0 z-2 col-span-full flex items-center gap-10 border-b border-border bg-background/95 px-8 backdrop-blur-xl max-[720px]:h-15 max-[720px]:gap-3.5 max-[720px]:px-4">
        <a class="text-lg font-bold text-primary no-underline" href={siteHref()}>
          Fex Design
        </a>
        <nav class="flex gap-6 text-muted-foreground max-[720px]:hidden">
          Docs <strong class="text-foreground">Components</strong> Patterns CLI
        </nav>
        <div class="ml-auto flex rounded-lg bg-muted-background p-0.75">
          <For each={frameworks}>
            {(item) => (
              <button
                class="cursor-pointer rounded-md border-0 bg-transparent px-2.25 py-1.5 text-muted-foreground capitalize data-[active=true]:bg-background data-[active=true]:font-semibold data-[active=true]:text-primary data-[active=true]:shadow-sm max-[1000px]:text-[0] max-[1000px]:first-letter:text-xs"
                data-active={item === framework()}
                onClick={() => navigate(item, slug())}
              >
                {item}
              </button>
            )}
          </For>
        </div>
      </header>
      <aside class="sticky top-16 h-[calc(100vh-64px)] overflow-auto border-r border-border px-5 py-9.5 max-[720px]:hidden">
        <p class="text-[11px] font-bold tracking-[0.12em] text-muted-foreground">COMPONENTS</p>
        <h3 class="mt-6 mb-2 text-[13px]">组件</h3>
        <div class="component-list">
          <For each={getDocumentSlugs()}>
            {(item) => (
              <a
                class="block rounded-md px-2.5 py-1.75 text-secondary-foreground no-underline data-[active=true]:bg-selected-background data-[active=true]:font-semibold data-[active=true]:text-primary"
                data-active={item === slug()}
                href={siteHref(`${framework()}/components/${item}`)}
                onClick={(event) => {
                  event.preventDefault()
                  navigate(framework(), item)
                }}
              >
                {title(item)}
              </a>
            )}
          </For>
        </div>
      </aside>
      <main
        ref={article}
        class="min-w-0 px-16 pt-16 pb-30 max-[720px]:px-5 max-[720px]:pt-10 max-[720px]:pb-20"
      >
        <Show
          when={document() && isDocumentedComponent(slug())}
          fallback={
            <div class="mt-4.5 rounded-lg border border-dashed border-border bg-muted-background p-4.5 text-muted-foreground">
              <h1 class="my-0 text-4xl font-bold tracking-tight">文档未找到</h1>
              <p class="leading-relaxed">该组件还没有 Markdown 文档。</p>
            </div>
          }
        >
          <h1 class="mt-2 mb-4 text-5xl font-bold tracking-[-0.04em] max-[720px]:text-[38px]">
            {document()!.frontmatter.title}
          </h1>
          <p class="max-w-155 text-lg leading-relaxed text-muted-foreground">
            {document()!.frontmatter.description}
          </p>
          <MdxDocument
            content={document()!.default}
            slug={slug() as 'button' | 'card' | 'spinner'}
            framework={framework()}
            layer={layer()}
          />
        </Show>
      </main>
      <div class="sticky top-0 max-h-screen self-start overflow-y-auto overflow-x-hidden border-l border-border px-5 py-10.5 [--anchor-indent:8px] max-[1000px]:hidden [&_nav[data-slot=anchor]]:w-full [&_nav[data-slot=anchor]]:ps-2.5 [&_[data-slot=anchor-link]]:overflow-hidden [&_[data-slot=anchor-link]]:px-2 [&_[data-slot=anchor-link]]:py-0.75 [&_[data-slot=anchor-link]]:text-xs [&_[data-slot=anchor-link]]:leading-4.5 [&_[data-slot=anchor-link]]:text-ellipsis [&_[data-slot=anchor-link]:hover]:bg-hover-background [&_[data-slot=anchor-link]:hover]:text-primary [&_[data-slot=anchor-link][data-state=active]]:bg-selected-background [&_[data-slot=anchor-link][data-state=active]]:font-semibold [&_[data-slot=anchor-link][data-state=active]]:text-primary">
        <Anchor items={toc()} targetOffset={88} behavior="auto" />
      </div>
    </div>
  )
}
function title(slug: string) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function collectToc(article: HTMLElement): readonly AnchorItemData<string>[] {
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
