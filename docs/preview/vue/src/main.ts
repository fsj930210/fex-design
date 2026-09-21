import { PREVIEW_PROTOCOL, isPreviewHostMessage } from '@fex-design/docs-shared/preview-protocol'
import { createApp, defineComponent, h, onMounted, ref, shallowRef, watch } from 'vue'
import type { Component } from 'vue'
import './styles.css'

const query = new URLSearchParams(location.search)
const path = location.pathname.split('/').filter(Boolean)
const initialLayer = query.get('layer') ?? path.at(-3) ?? 'ui'
const initialComponent = query.get('component') ?? path.at(-2) ?? ''
const initialDemo = query.get('demo') ?? path.at(-1) ?? ''
const embedded = query.get('embed') === 'true'

const modules = import.meta.glob(
  '../../../../packages/@fex-design/components/vue/src/{primitive,ui}/*/examples/*.vue',
) as Record<string, () => Promise<{ default: Component }>>

const moduleCache = new Map<string, Component>()

function findLoader(layer: string, component: string, demo: string) {
  const target = `/src/${layer}/${component}/examples/${demo}.vue`
  const key = Object.keys(modules).find((k) => k.includes(target))
  return key ? modules[key] : undefined
}

async function loadExample(layer: string, component: string, demo: string): Promise<Component | undefined> {
  const cacheKey = `${layer}/${component}/${demo}`
  if (moduleCache.has(cacheKey)) return moduleCache.get(cacheKey)
  const loader = findLoader(layer, component, demo)
  if (!loader) return undefined
  const mod = await loader()
  if (mod.default) moduleCache.set(cacheKey, mod.default)
  return mod.default
}

const send = (type: string, payload = {}) =>
  parent.postMessage({ protocol: PREVIEW_PROTOCOL, type, framework: 'vue', ...payload }, '*')

const Root = defineComponent({
  setup() {
    const currentInfo = ref({
      layer: initialLayer,
      component: initialComponent,
      demo: initialDemo,
    })
    const exampleComp = shallowRef<Component | null>(null)
    const loading = ref(true)

    const updateExample = async () => {
      if (!currentInfo.value.component || !currentInfo.value.demo) {
        loading.value = false
        return
      }
      loading.value = true
      const comp = await loadExample(
        currentInfo.value.layer,
        currentInfo.value.component,
        currentInfo.value.demo,
      )
      exampleComp.value = comp ?? null
      loading.value = false
    }

    watch(
      () => [currentInfo.value.layer, currentInfo.value.component, currentInfo.value.demo],
      () => {
        void updateExample()
      },
      { immediate: true },
    )

    onMounted(() => {
      const receive = (event: MessageEvent) => {
        if (isPreviewHostMessage(event.data)) {
          if (event.data.component && event.data.demo) {
            currentInfo.value = {
              layer: event.data.layer ?? 'ui',
              component: event.data.component,
              demo: event.data.demo,
            }
          }
        }
      }
      addEventListener('message', receive)
      send('ready')

      const runtime = document.querySelector<HTMLElement>('.runtime')
      if (runtime) {
        const sendResize = () => send('resize', { height: Math.ceil(runtime.scrollHeight) })
        new ResizeObserver(sendResize).observe(runtime)
        sendResize()
      }
    })

    return () => {
      if (loading.value) {
        return h('div', { class: 'runtime box-border grid min-h-30 place-items-center p-8' })
      }

      return h(
        'div',
        {
          class: 'runtime box-border grid min-h-30 place-items-center p-8',
          'data-embed': embedded ? 'true' : undefined,
        },
        exampleComp.value
          ? h(exampleComp.value)
          : `未找到示例：${currentInfo.value.layer}/${currentInfo.value.component}/${currentInfo.value.demo}`,
      )
    }
  },
})

createApp(Root).mount('#app')