import {
  createAnchorClickScrollGuard,
  ensureAnchorLinkVisible,
  getAnchorIndicatorStyles,
  getAnchorScrollTop,
  getAnchorTargetTop,
  getAnchorViewportHeight,
  isAnchorScrolledToEnd,
  resolveAnchorTarget,
} from '@fex-design/core/anchor/dom'
import { createAnchorController, getAnchorActiveKeys } from '@fex-design/core/anchor/model'
import type {
  AnchorActiveMode,
  AnchorOrientation,
  AnchorRegisteredItem,
} from '@fex-design/core/anchor/types'
import {
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'

export interface CreateAnchorOptions {
  activeKeys?: () => readonly string[] | undefined
  defaultActiveKeys?: readonly string[]
  activeMode?: () => AnchorActiveMode
  orientation?: () => AnchorOrientation
  container?: () => Window | HTMLElement | null | undefined
  targetOffset?: () => number
  threshold?: () => number
  behavior?: () => ScrollBehavior
  onChange?: (keys: readonly string[], items: readonly AnchorRegisteredItem[]) => void
}

export function createAnchor(options: CreateAnchorOptions = {}) {
  const [items, setItems] = createSignal<readonly AnchorRegisteredItem[]>([])
  const [root, setRoot] = createSignal<HTMLElement>()
  const [inkStyles, setInkStyles] = createSignal<ReturnType<typeof getAnchorIndicatorStyles>>([])
  const itemMap = new Map<string, AnchorRegisteredItem>()
  const initialActiveKeys = options.activeKeys?.()
  const controller = createAnchorController({
    ...(initialActiveKeys === undefined ? {} : { activeKeys: initialActiveKeys }),
    ...(options.defaultActiveKeys === undefined
      ? {}
      : { defaultActiveKeys: options.defaultActiveKeys }),
  })
  const clickScrollGuard = createAnchorClickScrollGuard()
  const snapshot = createCoreStoreSignal(controller)
  const activeKeys = createMemo(() => options.activeKeys?.() ?? snapshot().activeKeys)
  const orientation = () => options.orientation?.() ?? 'vertical'
  const visibleItems = createMemo(() =>
    orientation() === 'horizontal' ? items().filter((item) => !item.parentKey) : items(),
  )
  const highlightedKeys = createMemo(() => {
    const result = new Set(activeKeys())
    for (const item of items()) {
      if (!result.has(item.key)) continue
      let parentKey = item.parentKey
      while (parentKey) {
        result.add(parentKey)
        parentKey = itemMap.get(parentKey)?.parentKey
      }
    }
    return result
  })
  const container = () => options.container?.() ?? window
  const change = (keys: readonly string[]) => {
    const previous = controller.getSnapshot().activeKeys
    if (previous.length === keys.length && previous.every((key, index) => key === keys[index]))
      return
    const activeSet = new Set(keys)
    controller.change(keys, [])
    options.onChange?.(
      keys,
      items().filter((item) => activeSet.has(item.key)),
    )
  }
  const refreshIndicator = () => {
    const element = root()
    if (!element) return
    ensureAnchorLinkVisible(element, activeKeys(), orientation())
    setInkStyles(getAnchorIndicatorStyles(element, activeKeys(), orientation()))
  }
  const refresh = () => {
    const scrollContainer = container()
    const positions = visibleItems().flatMap((item) => {
      const target = resolveAnchorTarget(item.target)
      return target ? [{ item, top: getAnchorTargetTop(target, scrollContainer) }] : []
    })
    change(
      getAnchorActiveKeys({
        positions,
        scrollTop: getAnchorScrollTop(scrollContainer),
        viewportHeight: getAnchorViewportHeight(scrollContainer),
        threshold: options.threshold?.() ?? 16,
        mode: options.activeMode?.() ?? 'current',
        scrolledToEnd: isAnchorScrolledToEnd(scrollContainer),
      }),
    )
    refreshIndicator()
  }
  const activate = (item: AnchorRegisteredItem) => {
    const target = resolveAnchorTarget(item.target)
    if (!target) return
    const scrollContainer = container()
    const index = visibleItems().findIndex((entry) => entry.key === item.key)
    change(
      (options.activeMode?.() ?? 'current') === 'progress'
        ? visibleItems()
            .slice(0, index + 1)
            .map((entry) => entry.key)
        : [item.key],
    )
    clickScrollGuard.lock()
    scrollContainer.scrollTo({
      top: Math.max(
        getAnchorTargetTop(target, scrollContainer) -
          (item.targetOffset ?? options.targetOffset?.() ?? 0),
        0,
      ),
      behavior: options.behavior?.() ?? 'smooth',
    })
  }
  let frame = 0
  const schedule = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(refresh)
  }
  const handleScroll = () => {
    if (clickScrollGuard.shouldHandleScroll()) schedule()
  }
  const registerItem = (item: AnchorRegisteredItem) => {
    itemMap.set(item.key, item)
    setItems([...itemMap.values()])
    schedule()
    return () => {
      itemMap.delete(item.key)
      setItems([...itemMap.values()])
      schedule()
    }
  }
  onMount(() => {
    const scrollContainer = container()
    schedule()
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', schedule)
    onCleanup(() => {
      cancelAnimationFrame(frame)
      scrollContainer.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', schedule)
      clickScrollGuard.dispose()
    })
  })
  // Indicator geometry is an external DOM measurement.
  createEffect(() => {
    activeKeys()
    requestAnimationFrame(refreshIndicator)
  })
  return { activeKeys, activate, highlightedKeys, inkStyles, orientation, registerItem, setRoot }
}
