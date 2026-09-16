import { PREVIEW_PROTOCOL, isPreviewHostMessage } from '@fex-design/docs-shared/preview-protocol'
import { createApp, h, reactive } from 'vue'
import './styles.css'

const query = new URLSearchParams(location.search)
const path = location.pathname.split('/').filter(Boolean)
const layer = query.get('layer') ?? path.at(-3)
const component = query.get('component') ?? path.at(-2)
const demo = query.get('demo') ?? path.at(-1)
const embedded = query.get('embed') === 'true'
// Keep loaders lazy: one Preview URL must only fetch its selected example graph.
const modules = import.meta.glob(
  '../../../../packages/@fex-design/vue/src/{primitive,ui}/*/examples/*.vue',
  { eager: false },
) as Record<string, () => Promise<{ default: object }>>
const examplePath = Object.keys(modules).find((key) =>
  key.includes(`/${layer}/${component}/examples/${demo}.vue`),
)
const values = reactive<Record<string, never>>({})
const send = (type: string, payload = {}) =>
  parent.postMessage({ protocol: PREVIEW_PROTOCOL, type, framework: 'vue', ...payload }, '*')
addEventListener('message', (event) => {
  if (isPreviewHostMessage(event.data)) Object.assign(values, event.data.props)
})
async function bootstrap() {
  const module = examplePath ? await modules[examplePath]?.() : undefined
  const Example = module?.default
  const Root = {
    setup: () => () =>
      h(
        'div',
        {
          class: 'runtime box-border grid min-h-30 place-items-center p-8',
          'data-embed': embedded ? 'true' : undefined,
        },
        Example ? h(Example) : `未找到示例：${layer}/${component}/${demo}`,
      ),
  }
  createApp(Root).mount('#app')
  const runtime = document.querySelector<HTMLElement>('.runtime')!
  const sendResize = () => send('resize', { height: Math.ceil(runtime.scrollHeight) })
  new ResizeObserver(sendResize).observe(runtime)
  send('ready')
  sendResize()
}
void bootstrap()
