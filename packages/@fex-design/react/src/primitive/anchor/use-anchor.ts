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
import { useEffect, useMemo, useRef, useState } from 'react'
import { useMemoizedFn } from '../../hooks/use-memoized-fn'
import { useCoreStore } from '../../hooks/use-core-store'
import { useLazyRef } from '../../hooks/use-lazy-ref'

export interface UseAnchorOptions {
  activeKeys?: readonly string[]
  defaultActiveKeys?: readonly string[]
  activeMode?: AnchorActiveMode
  orientation?: AnchorOrientation
  container?: Window | HTMLElement | (() => Window | HTMLElement | null | undefined)
  targetOffset?: number
  threshold?: number
  behavior?: ScrollBehavior
  onChange?: (activeKeys: readonly string[], items: readonly AnchorRegisteredItem[]) => void
}

export function useAnchor({
  activeKeys: controlledKeys,
  defaultActiveKeys = [],
  activeMode = 'current',
  orientation = 'vertical',
  container,
  targetOffset = 0,
  threshold = 16,
  behavior = 'smooth',
  onChange,
}: UseAnchorOptions = {}) {
  const rootRef = useRef<HTMLElement | null>(null)
  const itemMap = useRef(new Map<string, AnchorRegisteredItem>())
  const [items, setItems] = useState<readonly AnchorRegisteredItem[]>([])
  const [inkStyles, setInkStyles] = useState<ReturnType<typeof getAnchorIndicatorStyles>>([])
  const controller = useLazyRef(() =>
    createAnchorController<unknown>({
      ...(controlledKeys === undefined ? {} : { activeKeys: controlledKeys }),
      defaultActiveKeys,
    }),
  ).current
  const clickScrollGuard = useLazyRef(() => createAnchorClickScrollGuard()).current
  controller.updateOptions({
    ...(controlledKeys === undefined ? {} : { activeKeys: controlledKeys }),
    defaultActiveKeys,
    onChange: (keys) => {
      const activeSet = new Set(keys)
      onChange?.(keys, items.filter((item) => activeSet.has(item.key)))
    },
  })
  const { activeKeys } = useCoreStore(controller)
  const visibleItems = useMemo(
    () => (orientation === 'horizontal' ? items.filter((item) => !item.parentKey) : items),
    [items, orientation],
  )
  const highlightedKeys = useMemo(() => {
    const result = new Set(activeKeys)
    for (const item of items) {
      if (!result.has(item.key)) continue
      let parentKey = item.parentKey
      while (parentKey) {
        result.add(parentKey)
        parentKey = itemMap.current.get(parentKey)?.parentKey
      }
    }
    return result
  }, [activeKeys, items])
  const resolveContainer = useMemoizedFn(() => {
    const resolved = typeof container === 'function' ? container() : container
    return resolved ?? window
  })
  const change = useMemoizedFn((keys: readonly string[]) => controller.change(keys, []))
  const refreshIndicator = useMemoizedFn(() => {
    const root = rootRef.current
    if (!root) return
    ensureAnchorLinkVisible(root, activeKeys, orientation)
    setInkStyles(getAnchorIndicatorStyles(root, activeKeys, orientation))
  })
  const refresh = useMemoizedFn(() => {
    const scrollContainer = resolveContainer()
    const positions = visibleItems.flatMap((item) => {
      const target = resolveAnchorTarget(item.target)
      return target
        ? [{ item, top: getAnchorTargetTop(target, scrollContainer) }]
        : []
    })
    change(
      getAnchorActiveKeys({
        positions,
        scrollTop: getAnchorScrollTop(scrollContainer),
        viewportHeight: getAnchorViewportHeight(scrollContainer),
        threshold,
        mode: activeMode,
        scrolledToEnd: isAnchorScrolledToEnd(scrollContainer),
      }),
    )
    refreshIndicator()
  })
  const activate = useMemoizedFn((item: AnchorRegisteredItem) => {
    const target = resolveAnchorTarget(item.target)
    if (!target) return
    const scrollContainer = resolveContainer()
    const index = visibleItems.findIndex((entry) => entry.key === item.key)
    change(
      activeMode === 'progress'
        ? visibleItems.slice(0, index + 1).map((entry) => entry.key)
        : [item.key],
    )
    clickScrollGuard.lock()
    scrollContainer.scrollTo({
      top: Math.max(getAnchorTargetTop(target, scrollContainer) - (item.targetOffset ?? targetOffset), 0),
      behavior,
    })
  })
  const registerItem = useMemoizedFn((item: AnchorRegisteredItem) => {
    itemMap.current.set(item.key, item)
    setItems([...itemMap.current.values()])
    requestAnimationFrame(refresh)
    return () => {
      itemMap.current.delete(item.key)
      setItems([...itemMap.current.values()])
      requestAnimationFrame(refresh)
    }
  })

  // Scroll and resize are external browser systems that drive the active item.
  useEffect(() => {
    const scrollContainer = resolveContainer()
    let frame = 0
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(refresh)
    }
    const handleScroll = () => {
      if (clickScrollGuard.shouldHandleScroll()) schedule()
    }
    schedule()
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      scrollContainer.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', schedule)
      clickScrollGuard.dispose()
    }
  }, [refresh, resolveContainer])

  // Indicator geometry is measured from rendered links after active state changes.
  useEffect(() => refreshIndicator(), [activeKeys, refreshIndicator])

  // Item registration changes the measurable targets after child effects run.
  useEffect(() => refresh(), [items, refresh])

  return {
    activeKeys,
    activate,
    highlightedKeys,
    inkStyles,
    items,
    orientation,
    refresh,
    registerItem,
    rootRef,
  }
}

export type AnchorApi = ReturnType<typeof useAnchor>
