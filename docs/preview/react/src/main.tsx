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
// Glob 是 Preview 的示例注册表；示例清单版本 2，强制 Vite 重新收集。
const exampleModules = import.meta.glob(
  '../../../../packages/@fex-design/react/src/{primitive,ui}/*/examples/*.tsx',
  { eager: true },
) as Record<string, Record<string, ComponentType>>
const examplePath = Object.keys(exampleModules).find((key) =>
  key.includes(`/${layer}/${component}/examples/${demo}.tsx`),
)
const Example = examplePath
  ? Object.values(exampleModules[examplePath]).find((value) => typeof value === 'function')
  : undefined
const send = (type: string, payload = {}) =>
  parent.postMessage({ protocol: PREVIEW_PROTOCOL, type, framework: 'react', ...payload }, '*')

function App() {
  const [values, setValues] = useState<Record<string, ApiValue>>({})
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (isPreviewHostMessage(event.data)) setValues(event.data.props)
    }
    addEventListener('message', receive)
    send('ready')
    const runtime = document.querySelector<HTMLElement>('.runtime')
    if (!runtime) return () => removeEventListener('message', receive)
    const sendResize = () => send('resize', { height: Math.ceil(runtime.scrollHeight) })
    const observer = new ResizeObserver(sendResize)
    observer.observe(runtime)
    sendResize()
    return () => {
      removeEventListener('message', receive)
      observer.disconnect()
    }
  }, [])
  if (!Example)
    return (
      <p>
        未找到示例：{layer}/{component}/{demo}
      </p>
    )
  return (
    <div className="runtime box-border grid min-h-30 place-items-center p-8" data-embed={embedded ? 'true' : undefined}>
      <Example />
    </div>
  )
}
createRoot(document.getElementById('root')!).render(<App />)
