import { PREVIEW_PROTOCOL, isPreviewHostMessage } from '@fex-design/docs-shared/preview-protocol'
import type { ApiValue } from '@fex-design/docs-shared/model'
import { render } from 'solid-js/web'
import { createSignal, ErrorBoundary, onCleanup, onMount, Show } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import './styles.css'

const [props, setProps] = createSignal<Record<string, ApiValue>>({})
const path = window.location.pathname.split('/').filter(Boolean)
const layer = path.at(-3)
const component = path.at(-2)
const demo = path.at(-1)
const exampleModules = import.meta.glob('../../../../packages/@fex-design/solid/src/{primitive,ui}/button/examples/*.tsx', { eager: true }) as Record<string, Record<string, () => unknown>>
const examplePath = Object.keys(exampleModules).find(key => key.includes(`/${layer}/button/examples/${demo}.tsx`))
const Example = examplePath ? Object.values(exampleModules[examplePath]).find(value => typeof value === 'function') : undefined
const embedded = new URLSearchParams(window.location.search).get('embed') === 'true'

function send(type: 'ready' | 'resize' | 'event' | 'error', payload: Record<string, unknown> = {}) {
  window.parent.postMessage({ protocol: PREVIEW_PROTOCOL, type, framework: 'solid', ...payload }, '*')
}

function Preview() {
  let root!: HTMLDivElement
  onMount(() => {
    const onMessage = (event: MessageEvent) => {
      if (isPreviewHostMessage(event.data)) setProps(event.data.props)
    }
    window.addEventListener('message', onMessage)
    const sendResize = () => send('resize', { height: Math.ceil(root.scrollHeight) })
    const observer = new ResizeObserver(sendResize)
    observer.observe(root)
    send('ready')
    sendResize()
    onCleanup(() => { window.removeEventListener('message', onMessage); observer.disconnect() })
  })
  return (
    <div ref={root} class="runtime" data-embed={embedded ? 'true' : undefined}>
      <Show when={!embedded}><a class="back" href={`/solid/components/${component}`}>← 返回文档</a></Show>
      <ErrorBoundary fallback={(error) => { send('error', { message: String(error) }); return <pre>{String(error)}</pre> }}>
        <Show when={component === 'button' && Example} fallback={<p>未找到示例：{layer}/{component}/{demo}</p>}>
          <Dynamic component={Example} />
        </Show>
      </ErrorBoundary>
    </div>
  )
}

render(() => <Preview />, document.getElementById('root')!)
