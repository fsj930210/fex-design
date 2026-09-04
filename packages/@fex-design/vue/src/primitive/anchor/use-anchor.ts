import { createAnchorClickScrollGuard, ensureAnchorLinkVisible, getAnchorIndicatorStyles, getAnchorScrollTop, getAnchorTargetTop, getAnchorViewportHeight, isAnchorScrolledToEnd, resolveAnchorTarget } from '@fex-design/core/anchor/dom'
import { createAnchorController, getAnchorActiveKeys } from '@fex-design/core/anchor/model'
import type { AnchorRegisteredItem } from '@fex-design/core/anchor/types'
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { useCoreStore } from '../../composables/use-core-store'

export interface UseAnchorOptions {
  activeKeys: () => readonly string[] | undefined
  defaultActiveKeys: () => readonly string[]
  activeMode: () => 'current' | 'progress'
  orientation: () => 'vertical' | 'horizontal'
  container: () => Window | HTMLElement | undefined
  targetOffset: () => number
  threshold: () => number
  behavior: () => ScrollBehavior
  onChange(keys: readonly string[], items: readonly AnchorRegisteredItem[]): void
}
export function useAnchor(options: UseAnchorOptions) {
  const root = ref<HTMLElement>()
  const items = shallowRef<readonly AnchorRegisteredItem[]>([])
  const itemMap = new Map<string, AnchorRegisteredItem>()
  const inkStyles = ref<ReturnType<typeof getAnchorIndicatorStyles>>([])
  const initialActiveKeys = options.activeKeys()
  const controller = createAnchorController({ ...(initialActiveKeys === undefined ? {} : { activeKeys: initialActiveKeys }), defaultActiveKeys: options.defaultActiveKeys() })
  const clickScrollGuard = createAnchorClickScrollGuard()
  const snapshot = useCoreStore(controller)
  const activeKeys = computed(() => { void snapshot.value; return options.activeKeys() ?? controller.getSnapshot().activeKeys })
  const orientation = computed(options.orientation)
  const visibleItems = computed(() => orientation.value === 'horizontal' ? items.value.filter((item) => !item.parentKey) : items.value)
  const highlightedKeys = computed(() => {
    const result = new Set(activeKeys.value)
    for (const item of items.value) {
      if (!result.has(item.key)) continue
      let parentKey = item.parentKey
      while (parentKey) { result.add(parentKey); parentKey = itemMap.get(parentKey)?.parentKey }
    }
    return result
  })
  const resolveContainer = () => options.container() ?? window
  const change = (keys: readonly string[]) => {
    const previous = controller.getSnapshot().activeKeys
    if (previous.length === keys.length && previous.every((key, index) => key === keys[index])) return
    const activeSet = new Set(keys)
    controller.change(keys, [])
    options.onChange(keys, items.value.filter((item) => activeSet.has(item.key)))
  }
  const refreshIndicator = () => {
    if (!root.value) return
    ensureAnchorLinkVisible(root.value, activeKeys.value, orientation.value)
    inkStyles.value = getAnchorIndicatorStyles(root.value, activeKeys.value, orientation.value)
  }
  const refresh = () => {
    const container = resolveContainer()
    const positions = visibleItems.value.flatMap((item) => {
      const target = resolveAnchorTarget(item.target)
      return target ? [{ item, top: getAnchorTargetTop(target, container) }] : []
    })
    change(getAnchorActiveKeys({ positions, scrollTop: getAnchorScrollTop(container), viewportHeight: getAnchorViewportHeight(container), threshold: options.threshold(), mode: options.activeMode(), scrolledToEnd: isAnchorScrolledToEnd(container) }))
    refreshIndicator()
  }
  const activate = (item: AnchorRegisteredItem) => {
    const target = resolveAnchorTarget(item.target)
    if (!target) return
    const container = resolveContainer()
    const index = visibleItems.value.findIndex((entry) => entry.key === item.key)
    change(options.activeMode() === 'progress' ? visibleItems.value.slice(0, index + 1).map((entry) => entry.key) : [item.key])
    clickScrollGuard.lock()
    container.scrollTo({ top: Math.max(getAnchorTargetTop(target, container) - (item.targetOffset ?? options.targetOffset()), 0), behavior: options.behavior() })
  }
  const registerItem = (item: AnchorRegisteredItem) => {
    itemMap.set(item.key, item); items.value = [...itemMap.values()]; schedule()
    return () => { itemMap.delete(item.key); items.value = [...itemMap.values()]; schedule() }
  }
  let frame = 0
  const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(refresh) }
  const handleScroll = () => { if (clickScrollGuard.shouldHandleScroll()) schedule() }
  onMounted(() => { const container = resolveContainer(); schedule(); container.addEventListener('scroll', handleScroll, { passive: true }); window.addEventListener('resize', schedule) })
  onBeforeUnmount(() => { const container = resolveContainer(); cancelAnimationFrame(frame); container.removeEventListener('scroll', handleScroll); window.removeEventListener('resize', schedule); clickScrollGuard.dispose() })
  // Controlled state and indicator geometry cross the component and DOM boundary.
  watch(options.activeKeys, (keys) => { controller.updateOptions({ ...(keys === undefined ? {} : { activeKeys: keys }), defaultActiveKeys: options.defaultActiveKeys() }); requestAnimationFrame(refreshIndicator) })
  return { activeKeys, activate, highlightedKeys, inkStyles, orientation, registerItem, root }
}
