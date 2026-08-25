import { PREVIEW_PROTOCOL, isPreviewHostMessage } from '@fex-design/docs-shared/preview-protocol'
import { createApp, h, reactive } from 'vue'
import './styles.css'

const path = location.pathname.split('/').filter(Boolean), layer = path.at(-3), component = path.at(-2), demo = path.at(-1)
const embedded = new URLSearchParams(location.search).get('embed') === 'true'
const modules = import.meta.glob('../../../../packages/@fex-design/vue/src/{primitive,ui}/button/examples/*.vue', { eager: true }) as Record<string, { default: object }>
const examplePath = Object.keys(modules).find(key => key.includes(`/${layer}/button/examples/${demo}.vue`))
const Example = examplePath ? modules[examplePath].default : undefined
const values = reactive<Record<string, never>>({})
const send = (type: string, payload = {}) => parent.postMessage({ protocol: PREVIEW_PROTOCOL, type, framework: 'vue', ...payload }, '*')
addEventListener('message', (event) => { if (isPreviewHostMessage(event.data)) Object.assign(values, event.data.props) })
const Root = { setup: () => () => h('div', { class: 'runtime', 'data-embed': embedded ? 'true' : undefined }, component === 'button' && Example ? h(Example) : `未找到示例：${layer}/${component}/${demo}`) }
createApp(Root).mount('#app'); send('ready')
const runtime = document.querySelector<HTMLElement>('.runtime')!
const sendResize = () => send('resize', { height: Math.ceil(runtime.scrollHeight) })
new ResizeObserver(sendResize).observe(runtime)
sendResize()
