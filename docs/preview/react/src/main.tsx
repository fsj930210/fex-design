import { PREVIEW_PROTOCOL, isPreviewHostMessage } from '@fex-design/docs-shared/preview-protocol'
import type { ApiValue } from '@fex-design/docs-shared/model'
import { observeRuntimeHeight } from '../../runtime-resize'
import { useEffect, useState } from 'react'
import type { ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const query = new URLSearchParams(location.search)
const path = location.pathname.split('/').filter(Boolean)
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

const exampleLoaders = import.meta.glob(
  '../../../../packages/@fex-design/components/react/src/{primitive,ui}/*/examples/*.tsx',
) as Record<string, () => Promise<Record<string, ComponentType>>>

const moduleCache = new Map<string, ComponentType>()

function findLoader(layer: string, component: string, demo: string) {
  const target = `/src/${layer}/${component}/examples/${demo}.tsx`
  const key = Object.keys(exampleLoaders).find((k) => k.includes(target))
  return key ? exampleLoaders[key] : undefined
}

async function loadExample(layer: string, component: string, demo: string): Promise<ComponentType | undefined> {
  const cacheKey = `${layer}/${component}/${demo}`
  if (moduleCache.has(cacheKey)) return moduleCache.get(cacheKey)
  const loader = findLoader(layer, component, demo)
  if (!loader) return undefined
  const mod = await loader()
  const comp = Object.values(mod).find((val) => typeof val === 'function')
  if (comp) moduleCache.set(cacheKey, comp)
  return comp
}

const send = (type: string, payload = {}) =>
  parent.postMessage({ protocol: PREVIEW_PROTOCOL, type, framework: 'react', ...payload }, '*')

function App() {
  const [currentInfo, setCurrentInfo] = useState({
    layer: initialLayer,
    component: initialComponent,
    demo: initialDemo,
  })
  const [ExampleComp, setExampleComp] = useState<ComponentType | null>(null)
  const [loading, setLoading] = useState(true)
  const [, setValues] = useState<Record<string, ApiValue>>({})

  useEffect(() => {
    let active = true
    if (!currentInfo.component || !currentInfo.demo) {
      setLoading(false)
      return
    }
    setLoading(true)
    loadExample(currentInfo.layer, currentInfo.component, currentInfo.demo).then((comp) => {
      if (!active) return
      setExampleComp(() => comp ?? null)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [currentInfo.layer, currentInfo.component, currentInfo.demo])

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (isPreviewHostMessage(event.data)) {
        if ('theme' in event.data && event.data.theme) applyTheme(event.data.theme)
        if (event.data.type === 'render') {
          if (event.data.props) setValues(event.data.props)
          if (event.data.component && event.data.demo) {
            setCurrentInfo({
              layer: event.data.layer ?? 'ui',
              component: event.data.component,
              demo: event.data.demo,
            })
          }
        }
      }
    }
    addEventListener('message', receive)
    send('ready')
    return () => removeEventListener('message', receive)
  }, [])

  useEffect(() => {
    const runtime = document.querySelector<HTMLElement>('.runtime')
    if (!runtime) return
    return observeRuntimeHeight(runtime, (height) => send('resize', { height }))
  }, [ExampleComp, loading])

  if (loading) {
    return (
      <div
        className={`runtime box-border grid place-items-center p-8 ${embedded ? '' : 'min-h-screen'}`}
        data-embed={embedded ? 'true' : undefined}
      />
    )
  }

  if (!ExampleComp) {
    return (
      <p>
        未找到示例：{currentInfo.layer}/{currentInfo.component}/{currentInfo.demo}
      </p>
    )
  }

  return (
    <div
      className={`runtime box-border grid place-items-center p-8 ${embedded ? '' : 'min-h-screen'}`}
      data-embed={embedded ? 'true' : undefined}
    >
      <ExampleComp />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
