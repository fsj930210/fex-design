import { PREVIEW_PROTOCOL, isPreviewHostMessage } from '@fex-design/docs-shared/preview-protocol'
import type { ApiValue } from '@fex-design/docs-shared/model'
import { render } from 'solid-js/web'
import { createEffect, createSignal, ErrorBoundary, onCleanup, onMount, Show } from 'solid-js'
import type { Component } from 'solid-js'
import './styles.css'

const query = new URLSearchParams(window.location.search)
const path = window.location.pathname.split('/').filter(Boolean)
const initialLayer = query.get('layer') ?? path.at(-3) ?? 'ui'
const initialComponent = query.get('component') ?? path.at(-2) ?? ''
const initialDemo = query.get('demo') ?? path.at(-1) ?? ''
const embedded = query.get('embed') === 'true'

function applyTheme(theme?: string) {
  if (typeof document === 'undefined') return
  const current = theme === 'light' ? 'light' : 'dark'
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(current)
  root.setAttribute('data-theme', current)
  root.style.colorScheme = current
}

const initialTheme = query.get('theme') ?? (document.documentElement.classList.contains('light') ? 'light' : 'dark')
applyTheme(initialTheme)

const exampleModules = import.meta.glob(
  '../../../../packages/@fex-design/components/solid/src/{primitive,ui}/*/examples/*.tsx',
  { eager: false },
) as Record<string, () => Promise<Record<string, () => unknown>>>

const moduleCache = new Map<string, Component>()

function findLoader(layer: string, component: string, demo: string) {
  const target = `/src/${layer}/${component}/examples/${demo}.tsx`
  const key = Object.keys(exampleModules).find((k) => k.includes(target))
  return key ? exampleModules[key] : undefined
}

async function loadExample(layer: string, component: string, demo: string): Promise<Component | undefined> {
  const cacheKey = `${layer}/${component}/${demo}`
  if (moduleCache.has(cacheKey)) return moduleCache.get(cacheKey)
  const loader = findLoader(layer, component, demo)
  if (!loader) return undefined
  const mod = await loader()
  const comp = (mod.default ??
    Object.values(mod).find((value) => typeof value === 'function')) as Component | undefined
  if (comp) moduleCache.set(cacheKey, comp)
  return comp
}

function send(type: 'ready' | 'resize' | 'event' | 'error', payload: Record<string, unknown> = {}) {
  window.parent.postMessage(
    { protocol: PREVIEW_PROTOCOL, type, framework: 'solid', ...payload },
    '*',
  )
}

function Preview() {
  let root!: HTMLDivElement
  const [, setProps] = createSignal<Record<string, ApiValue>>({})
  const [currentInfo, setCurrentInfo] = createSignal({
    layer: initialLayer,
    component: initialComponent,
    demo: initialDemo,
  })
  const [exampleComp, setExampleComp] = createSignal<Component | null>(null)
  const [loading, setLoading] = createSignal(true)

  createEffect(() => {
    const info = currentInfo()
    if (!info.component || !info.demo) {
      setLoading(false)
      return
    }
    setLoading(true)
    let active = true
    loadExample(info.layer, info.component, info.demo).then((comp) => {
      if (!active) return
      setExampleComp(() => comp ?? null)
      setLoading(false)
    })
    onCleanup(() => {
      active = false
    })
  })

  onMount(() => {
    const onMessage = (event: MessageEvent) => {
      if (isPreviewHostMessage(event.data)) {
        if (event.data.theme) applyTheme(event.data.theme)
        if (event.data.props) setProps(event.data.props)
        if (event.data.component && event.data.demo) {
          setCurrentInfo({
            layer: event.data.layer ?? 'ui',
            component: event.data.component,
            demo: event.data.demo,
          })
        }
      }
    }
    window.addEventListener('message', onMessage)
    const sendResize = () => {
      if (root) send('resize', { height: Math.ceil(root.scrollHeight) })
    }
    const observer = new ResizeObserver(sendResize)
    observer.observe(root)
    send('ready')
    sendResize()

    onCleanup(() => {
      window.removeEventListener('message', onMessage)
      observer.disconnect()
    })
  })

  return (
    <div
      ref={root}
      class={`runtime box-border grid min-h-30 place-items-center p-8 ${!embedded ? 'min-h-screen content-center gap-8' : ''}`}
      data-embed={embedded ? 'true' : undefined}
    >
      <Show when={!embedded && currentInfo().component}>
        <a class="fixed top-5 left-5 text-sm no-underline" href={`/solid/components/${currentInfo().component}`}>
          ← 返回文档
        </a>
      </Show>
      <ErrorBoundary
        fallback={(error) => {
          send('error', { message: String(error) })
          return <pre class="whitespace-pre-wrap text-red-600">{String(error)}</pre>
        }}
      >
        <Show when={!loading()} fallback={<div class="box-border grid min-h-30 place-items-center" />}>
          <Show
            when={exampleComp()}
            fallback={
              <p>
                未找到示例：{currentInfo().layer}/{currentInfo().component}/{currentInfo().demo}
              </p>
            }
          >
            {(Comp) => {
              const ComponentToRender = Comp()
              return <ComponentToRender />
            }}
          </Show>
        </Show>
      </ErrorBoundary>
    </div>
  )
}

render(() => <Preview />, document.getElementById('root')!)