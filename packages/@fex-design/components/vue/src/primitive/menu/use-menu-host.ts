import {
  onBeforeUnmount,
  onMounted,
  onUpdated,
  watch,
  shallowRef,
  type ComponentPublicInstance,
} from 'vue'
import { useMenuContext } from './context'
export function useMenuHost(bind: (element: HTMLElement) => () => void) {
  const dom = useMenuContext()
  const host = shallowRef<HTMLElement | null>(null)
  let stop: (() => void) | undefined
  function setHost(value: Element | ComponentPublicInstance | null) {
    host.value = value instanceof HTMLElement ? value : null
  }
  // A custom scoped slot may replace its host. Register only committed DOM.
  watch(
    host,
    (element) => {
      stop?.()
      stop = element ? bind(element) : undefined
    },
    { flush: 'post' },
  )
  onMounted(() => dom.refresh())
  onUpdated(() => dom.refresh())
  onBeforeUnmount(() => {
    stop?.()
    stop = undefined
  })
  return setHost
}
