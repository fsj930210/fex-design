import { PREVIEW_PROTOCOL, isPreviewHostMessage } from '@fex-design/docs-shared/preview-protocol'
import type { ApiValue } from '@fex-design/docs-shared/model'
import { render } from 'solid-js/web'
import { createSignal, ErrorBoundary, onCleanup, onMount, Show } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import './styles.css'

const query = new URLSearchParams(window.location.search)
const path = window.location.pathname.split('/').filter(Boolean)
const layer = query.get('layer') ?? path.at(-3)
const component = query.get('component') ?? path.at(-2)
const demo = query.get('demo') ?? path.at(-1)
// Keep loaders lazy: one Preview URL must only fetch its selected example graph.
const exampleModules = import.meta.glob(
  '../../../../packages/@fex-design/solid/src/{primitive,ui}/*/examples/*.tsx',
  { eager: false },
) as Record<string, () => Promise<Record<string, () => unknown>>>
const examplePath = Object.keys(exampleModules).find((key) =>
  key.includes(`/${layer}/${component}/examples/${demo}.tsx`),
)
const embedded = query.get('embed') === 'true'

function send(type: 'ready' | 'resize' | 'event' | 'error', payload: Record<string, unknown> = {}) {
  window.parent.postMessage(
    { protocol: PREVIEW_PROTOCOL, type, framework: 'solid', ...payload },
    '*',
  )
}

function Preview() {
  let root!: HTMLDivElement
  const [, setProps] = createSignal<Record<string, ApiValue>>({})
  const [Example, setExample] = createSignal<(() => unknown) | null | undefined>(undefined)
  onMount(() => {
    const sendResize = () => send('resize', { height: Math.ceil(root.scrollHeight) })
    const reportReady = () => {
      send('ready')
      sendResize()
    }
    const onMessage = (event: MessageEvent) => {
      if (!isPreviewHostMessage(event.data)) return
      setProps(event.data.props)
      if (Example() !== undefined) reportReady()
    }
    window.addEventListener('message', onMessage)
    const observer = new ResizeObserver(sendResize)
    observer.observe(root)
    const load = async () => {
      const module = examplePath ? await exampleModules[examplePath]?.() : undefined
      const loadedExample = module
        ? (module.default ??
          Object.values(module).find((value) => typeof value === 'function') ??
          null)
        : null
      // Solid setters treat a bare function as an updater, so store the component through a wrapper.
      setExample(() => loadedExample)
      queueMicrotask(reportReady)
    }
    void load()
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
      <Show when={!embedded}>
        <a class="fixed top-5 left-5 text-sm no-underline" href={`/solid/components/${component}`}>
          ← 返回文档
        </a>
      </Show>
      <ErrorBoundary
        fallback={(error) => {
          send('error', { message: String(error) })
          return <pre class="whitespace-pre-wrap text-red-600">{String(error)}</pre>
        }}
      >
        <Show
          when={Example()}
          fallback={
            <p>
              未找到示例：{layer}/{component}/{demo}
            </p>
          }
        >
          <Dynamic component={Example()!} />
        </Show>
      </ErrorBoundary>
    </div>
  )
}

render(() => <Preview />, document.getElementById('root')!)
