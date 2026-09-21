import { createEffect, createMemo, createSignal, For, Show } from 'solid-js'
import { Anchor, type AnchorItemData } from '@fex-design/solid/ui/anchor'
import { frameworks } from '@fex-design/docs-shared/model'
import { isDocumentedComponent } from './data'
import { getComponentDocument, getDocumentSlugs } from './content'
import { MdxDocument } from './mdx-document'
import { HomePage } from './home'
import type { Framework } from './types'

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const getParsedRoute = () => {
  const routePath = location.pathname.startsWith(basePath)
    ? location.pathname.slice(basePath.length)
    : location.pathname
  const parts = routePath.split('/').filter(Boolean)
  const isHome = parts.length === 0 || (parts.length === 1 && !frameworks.includes(parts[0] as Framework))
  const pathFramework = parts[0] as Framework
  const framework = frameworks.includes(pathFramework) ? pathFramework : 'solid'
  const slug = parts[2] ?? (isHome ? '' : 'button')
  return { isHome, framework, slug }
}

const initialRoute = getParsedRoute()
const siteHref = (path = '') => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export function App() {
  const initialTheme = (localStorage.getItem('fex_theme') as 'light' | 'dark') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark')
  const [theme, setTheme] = createSignal<'light' | 'dark'>(initialTheme)
  const [isHome, setIsHome] = createSignal<boolean>(initialRoute.isHome)
  const [framework, setFramework] = createSignal<Framework>(initialRoute.framework)
  const [slug, setSlug] = createSignal<string>(initialRoute.slug)
  const [layer] = createSignal<'primitive' | 'ui'>(
    (new URLSearchParams(location.search).get('layer') as 'primitive' | 'ui') ?? 'ui',
  )
  const document = createMemo(() => getComponentDocument(slug()))
  const [toc, setToc] = createSignal<readonly AnchorItemData<string>[]>([])
  let article!: HTMLElement

  // MDX heading ids 由 rehype-slug 生成；文档变化后从真实 DOM 同步目录。
  createEffect(() => {
    if (!isHome()) {
      document()
      layer()
      queueMicrotask(() => setToc(collectToc(article)))
    }
  })

  const navigateToComponent = (nextFramework: Framework = framework(), nextSlug: string = slug() || 'button') => {
    setIsHome(false)
    setFramework(nextFramework)
    setSlug(nextSlug)
    history.pushState(
      null,
      '',
      siteHref(`${nextFramework}/components/${nextSlug}`),
    )
    scrollTo({ top: 0 })
  }

  const navigateToHome = () => {
    setIsHome(true)
    history.pushState(null, '', siteHref(''))
    scrollTo({ top: 0 })
  }

createEffect(() => {
    const currentTheme = theme()
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(currentTheme)
    document.documentElement.setAttribute('data-theme', currentTheme)
    localStorage.setItem('fex_theme', currentTheme)
  })

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  // 监听浏览器前进后退
  createEffect(() => {
    const onPopState = () => {
      const current = getParsedRoute()
      setIsHome(current.isHome)
      setFramework(current.framework)
      setSlug(current.slug)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  })

  return (
    <div class="min-h-screen bg-background font-sans text-foreground">
      {/* 顶部全局 Header */}
      <header class="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur-xl sm:px-8 transition-colors duration-200">
        <div class="flex items-center gap-8">
          <a
            class="flex items-center gap-2.5 text-lg font-bold text-foreground no-underline cursor-pointer"
            href={siteHref('')}
            onClick={(e) => {
              e.preventDefault()
              navigateToHome()
            }}
          >
            <img src={siteHref('favicon.svg')} alt="Logo" class="h-7 w-7 rounded-md" />
            <span class="tracking-tight font-extrabold text-foreground">Fex Design</span>
          </a>

          <nav class="hidden items-center gap-6 text-sm sm:flex">
            <button
              class="cursor-pointer bg-transparent border-0 p-0 text-sm font-medium transition-colors hover:text-foreground"
              classList={{
                'text-foreground font-bold border-b-2 border-foreground pb-0.5': isHome(),
                'text-muted-foreground': !isHome(),
              }}
              onClick={navigateToHome}
            >
              首页
            </button>
            <button
              class="cursor-pointer bg-transparent border-0 p-0 text-sm font-medium transition-colors hover:text-foreground"
              classList={{
                'text-foreground font-bold border-b-2 border-foreground pb-0.5': !isHome(),
                'text-muted-foreground': isHome(),
              }}
              onClick={() => navigateToComponent(framework(), slug() || 'button')}
            >
              组件
            </button>
          </nav>
        </div>

        <div class="flex items-center gap-3">
          {/* 框架选择切换器：仅在文档页展示 */}
          <Show when={!isHome()}>
            <div class="flex items-center gap-1 rounded-lg bg-muted-background p-1 border border-border">
              <For each={frameworks}>
                {(item) => (
                  <button
                    class="cursor-pointer rounded-md border-0 bg-transparent px-2.5 py-1 text-xs font-medium text-muted-foreground capitalize transition-all hover:text-foreground data-[active=true]:bg-background data-[active=true]:font-bold data-[active=true]:text-foreground data-[active=true]:shadow-xs"
                    data-active={item === framework()}
                    onClick={() => {
                      setFramework(item)
                      navigateToComponent(item, slug() || 'button')
                    }}
                  >
                    {item}
                  </button>
                )}
              </For>
            </div>
          </Show>

          {/* 明暗主题切换按钮：显眼且双端均清晰 */}
          <button
            class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-secondary-background text-foreground transition-all hover:bg-hover-background hover:scale-105"
            onClick={toggleTheme}
            title={theme() === 'dark' ? '切换为浅色模式' : '切换为深色模式'}
            aria-label="Toggle theme"
          >
            <Show
              when={theme() === 'dark'}
              fallback={
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" /><path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" /><path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
              </svg>
            </Show>
          </button>
        </div>
      </header>

      <Show
        when={!isHome()}
        fallback={
          <HomePage
            currentFramework={framework()}
            onGoToComponents={navigateToComponent}
          />
        }
      >
        {/* 组件文档布局 */}
        <div class="grid min-h-[calc(100vh-64px)] grid-cols-[240px_minmax(0,1fr)_220px] justify-center max-[1080px]:grid-cols-[200px_minmax(0,1fr)] max-[768px]:block">
          {/* 左侧组件导航 */}
          <aside class="sticky top-16 h-[calc(100vh-64px)] overflow-y-auto border-r border-border px-5 py-6 max-[768px]:hidden">
            <p class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
              Components
            </p>
            <div class="mt-4 flex flex-col gap-0.5">
              <For each={getDocumentSlugs()}>
                {(item) => (
                  <a
                    class="block rounded-md px-3 py-1.5 text-sm text-secondary-foreground no-underline transition-colors hover:bg-hover-background hover:text-foreground data-[active=true]:bg-selected-background data-[active=true]:font-semibold data-[active=true]:text-primary"
                    data-active={item === slug()}
                    href={siteHref(`${framework()}/components/${item}`)}
                    onClick={(event) => {
                      event.preventDefault()
                      navigateToComponent(framework(), item)
                    }}
                  >
                    {title(item)}
                  </a>
                )}
              </For>
            </div>
          </aside>

          {/* 中间主文档区 */}
          <main
            ref={article}
            class="min-w-0 max-w-4xl px-8 pt-10 pb-28 sm:px-12 max-[768px]:px-5 max-[768px]:pt-6"
          >
            <Show
              when={document() && isDocumentedComponent(slug())}
              fallback={
                <div class="mt-4.5 rounded-lg border border-dashed border-border bg-muted-background p-6 text-muted-foreground">
                  <h1 class="my-0 text-3xl font-bold tracking-tight">文档未找到</h1>
                  <p class="mt-2 text-sm leading-relaxed">该组件还没有 Markdown 文档。</p>
                </div>
              }
            >
              <h1 class="mt-0 mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
                {document()!.frontmatter.title}
              </h1>
              <p class="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
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

          {/* 右侧 Anchor 目录 */}
          <div class="sticky top-16 h-[calc(100vh-64px)] self-start overflow-y-auto border-l border-border px-4 py-8 [--anchor-indent:8px] max-[1080px]:hidden [&_nav[data-slot=anchor]]:w-full [&_nav[data-slot=anchor]]:ps-2 [&_[data-slot=anchor-link]]:overflow-hidden [&_[data-slot=anchor-link]]:px-2 [&_[data-slot=anchor-link]]:py-1 [&_[data-slot=anchor-link]]:text-xs [&_[data-slot=anchor-link]]:leading-snug [&_[data-slot=anchor-link]]:text-ellipsis [&_[data-slot=anchor-link]:hover]:bg-hover-background [&_[data-slot=anchor-link]:hover]:text-primary [&_[data-slot=anchor-link][data-state=active]]:bg-selected-background [&_[data-slot=anchor-link][data-state=active]]:font-semibold [&_[data-slot=anchor-link][data-state=active]]:text-primary">
            <p class="mb-3 px-2 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
              本页目录
            </p>
            <Anchor items={toc()} targetOffset={88} behavior="auto" />
          </div>
        </div>
      </Show>
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
