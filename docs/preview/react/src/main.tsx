import { PREVIEW_PROTOCOL, isPreviewHostMessage } from '@fex-design/docs-shared/preview-protocol'
import type { ApiValue } from '@fex-design/docs-shared/model'
import { useEffect, useState } from 'react'
import type { ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const query = new URLSearchParams(location.search)
const path = location.pathname.split('/').filter(Boolean)
const layer = query.get('layer') ?? path.at(-3)
const component = query.get('component') ?? path.at(-2)
const demo = query.get('demo') ?? path.at(-1)
const embedded = query.get('embed') === 'true'
// Keep loaders lazy: one Preview URL must only fetch its selected example graph.
const exampleModules = import.meta.glob(
  '../../../../packages/@fex-design/react/src/{primitive,ui}/*/examples/*.tsx',
  { eager: false },
) as Record<string, () => Promise<Record<string, ComponentType>>>
const examplePath = Object.keys(exampleModules).find((key) =>
  key.includes(`/${layer}/${component}/examples/${demo}.tsx`),
)
const send = (type: string, payload = {}) =>
  parent.postMessage({ protocol: PREVIEW_PROTOCOL, type, framework: 'react', ...payload }, '*')

function App() {
  const [values, setValues] = useState<Record<string, ApiValue>>({})
  const [Example, setExample] = useState<ComponentType | null | undefined>(undefined)
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (isPreviewHostMessage(event.data)) setValues(event.data.props)
    }
    addEventListener('message', receive)
    const runtime = document.querySelector<HTMLElement>('.runtime')
    if (!runtime) return () => removeEventListener('message', receive)
    const sendResize = () => send('resize', { height: Math.ceil(runtime.scrollHeight) })
    const observer = new ResizeObserver(sendResize)
    observer.observe(runtime)
    const load = async () => {
      const module = examplePath ? await exampleModules[examplePath]?.() : undefined
      const loadedExample = module
        ? (Object.values(module).find((value) => typeof value === 'function') ?? null)
        : null
      // React setters treat a bare component function as an updater.
      setExample(() => loadedExample)
      requestAnimationFrame(() => {
        send('ready')
        sendResize()
      })
    }
    void load()
    return () => {
      removeEventListener('message', receive)
      observer.disconnect()
    }
  }, [])
  return (
    <div
      className="runtime box-border grid min-h-30 place-items-center p-8"
      data-embed={embedded ? 'true' : undefined}
    >
      {Example === null ? (
        <p>
          未找到示例：{layer}/{component}/{demo}
        </p>
      ) : Example ? (
        <Example />
      ) : null}
    </div>
  )
}
const root = createRoot(document.getElementById('root')!)
root.render(<App />)
if (import.meta.hot) import.meta.hot.dispose(() => root.unmount())
