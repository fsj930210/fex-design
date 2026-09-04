import { createAnchorClickScrollGuard, ensureAnchorLinkVisible, getAnchorIndicatorStyles, getAnchorScrollTop, getAnchorTargetTop, getAnchorViewportHeight, isAnchorScrolledToEnd, resolveAnchorTarget } from '@fex-design/core/anchor/dom'
import { createAnchorController, getAnchorActiveKeys } from '@fex-design/core/anchor/model'
import type { AnchorActiveMode, AnchorOrientation, AnchorRegisteredItem, AnchorTarget } from '@fex-design/core/anchor/types'
import { anchorIndicatorClassName, anchorItemClassName, anchorLinkClassName, anchorListClassName, anchorRailClassName, anchorRootClassName } from '@fex-design/styles/anchor'
import { cn } from '@fex/utils'
import { createContext, createEffect, createMemo, createSignal, For, onCleanup, onMount, splitProps, useContext, type JSX, type ParentProps } from 'solid-js'
import { createCoreStoreSignal } from '../../primitives/create-core-store-signal'

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
  const controller = createAnchorController({ ...(initialActiveKeys === undefined ? {} : { activeKeys: initialActiveKeys }), ...(options.defaultActiveKeys === undefined ? {} : { defaultActiveKeys: options.defaultActiveKeys }) })
  const clickScrollGuard = createAnchorClickScrollGuard()
  const snapshot = createCoreStoreSignal(controller)
  const activeKeys = createMemo(() => options.activeKeys?.() ?? snapshot().activeKeys)
  const orientation = () => options.orientation?.() ?? 'vertical'
  const visibleItems = createMemo(() => orientation() === 'horizontal' ? items().filter((item) => !item.parentKey) : items())
  const highlightedKeys = createMemo(() => {
    const result = new Set(activeKeys())
    for (const item of items()) { if (!result.has(item.key)) continue; let parentKey = item.parentKey; while (parentKey) { result.add(parentKey); parentKey = itemMap.get(parentKey)?.parentKey } }
    return result
  })
  const container = () => options.container?.() ?? window
  const change = (keys: readonly string[]) => { const previous=controller.getSnapshot().activeKeys;if(previous.length===keys.length&&previous.every((key,index)=>key===keys[index]))return;const activeSet = new Set(keys); controller.change(keys, []); options.onChange?.(keys, items().filter((item) => activeSet.has(item.key))) }
  const refreshIndicator = () => { const element = root(); if (!element) return; ensureAnchorLinkVisible(element, activeKeys(), orientation()); setInkStyles(getAnchorIndicatorStyles(element, activeKeys(), orientation())) }
  const refresh = () => {
    const scrollContainer = container()
    const positions = visibleItems().flatMap((item) => { const target = resolveAnchorTarget(item.target); return target ? [{ item, top: getAnchorTargetTop(target, scrollContainer) }] : [] })
    change(getAnchorActiveKeys({ positions, scrollTop: getAnchorScrollTop(scrollContainer), viewportHeight: getAnchorViewportHeight(scrollContainer), threshold: options.threshold?.() ?? 16, mode: options.activeMode?.() ?? 'current', scrolledToEnd: isAnchorScrolledToEnd(scrollContainer) }))
    refreshIndicator()
  }
  const activate = (item: AnchorRegisteredItem) => { const target = resolveAnchorTarget(item.target); if (!target) return; const scrollContainer = container(); const index = visibleItems().findIndex((entry) => entry.key === item.key); change((options.activeMode?.() ?? 'current') === 'progress' ? visibleItems().slice(0, index + 1).map((entry) => entry.key) : [item.key]); clickScrollGuard.lock(); scrollContainer.scrollTo({ top: Math.max(getAnchorTargetTop(target, scrollContainer) - (item.targetOffset ?? options.targetOffset?.() ?? 0), 0), behavior: options.behavior?.() ?? 'smooth' }) }
  let frame = 0
  const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(refresh) }
  const handleScroll = () => { if (clickScrollGuard.shouldHandleScroll()) schedule() }
  const registerItem = (item: AnchorRegisteredItem) => { itemMap.set(item.key, item); setItems([...itemMap.values()]); schedule(); return () => { itemMap.delete(item.key); setItems([...itemMap.values()]); schedule() } }
  onMount(() => { const scrollContainer = container(); schedule(); scrollContainer.addEventListener('scroll', handleScroll, { passive: true }); window.addEventListener('resize', schedule); onCleanup(() => { cancelAnimationFrame(frame); scrollContainer.removeEventListener('scroll', handleScroll); window.removeEventListener('resize', schedule); clickScrollGuard.dispose() }) })
  // Indicator geometry is an external DOM measurement.
  createEffect(() => { activeKeys(); requestAnimationFrame(refreshIndicator) })
  return { activeKeys, activate, highlightedKeys, inkStyles, orientation, registerItem, setRoot }
}
type AnchorApi = ReturnType<typeof createAnchor>
const AnchorContext = createContext<AnchorApi>()
const AnchorItemContext = createContext<AnchorRegisteredItem>()
function useAnchorContext(name: string) { const context = useContext(AnchorContext); if (!context) throw new Error(`${name} must be used inside AnchorRoot`); return context }

export type AnchorRootProps = ParentProps<Omit<JSX.HTMLAttributes<HTMLElement>, 'onChange'> & { activeKeys?: readonly string[]; defaultActiveKeys?: readonly string[]; activeMode?: AnchorActiveMode; orientation?: AnchorOrientation; container?: Window | HTMLElement | (() => Window | HTMLElement | null | undefined); targetOffset?: number; threshold?: number; behavior?: ScrollBehavior; onChange?: (keys: readonly string[], items: readonly AnchorRegisteredItem[]) => void }>
export function AnchorRoot(props: AnchorRootProps) {
  const [local, rest] = splitProps(props, ['activeKeys', 'defaultActiveKeys', 'activeMode', 'orientation', 'container', 'targetOffset', 'threshold', 'behavior', 'onChange', 'class', 'children', 'ref'])
  const anchor = createAnchor({ activeKeys: () => local.activeKeys, defaultActiveKeys: local.defaultActiveKeys, activeMode: () => local.activeMode ?? 'current', orientation: () => local.orientation ?? 'vertical', container: () => typeof local.container === 'function' ? local.container() : (local.container ?? window), targetOffset: () => local.targetOffset ?? 0, threshold: () => local.threshold ?? 16, behavior: () => local.behavior ?? 'smooth', onChange: local.onChange })
  return <AnchorContext.Provider value={anchor}><nav {...rest} ref={(element) => { anchor.setRoot(element); if (typeof local.ref === 'function') local.ref(element) }} data-slot="anchor" data-orientation={anchor.orientation()} class={cn(anchorRootClassName({ orientation: anchor.orientation() }), local.class)}>{local.children}</nav></AnchorContext.Provider>
}
export function AnchorList(props: ParentProps<JSX.HTMLAttributes<HTMLUListElement>>) { const anchor = useAnchorContext('AnchorList'); const [local, rest] = splitProps(props, ['class', 'children']); return <ul {...rest} data-slot="anchor-list" class={cn(anchorListClassName({ orientation: anchor.orientation() }), local.class)}>{local.children}</ul> }
export type AnchorItemProps = ParentProps<JSX.HTMLAttributes<HTMLLIElement> & { value: string; target: AnchorTarget; targetOffset?: number }>
export function AnchorItem(props: AnchorItemProps) { const anchor = useAnchorContext('AnchorItem'); const parent = useContext(AnchorItemContext); const [local, rest] = splitProps(props, ['value', 'target', 'targetOffset', 'class', 'children']); const item: AnchorRegisteredItem = { key: local.value, target: local.target, ...(local.targetOffset === undefined ? {} : { targetOffset: local.targetOffset }), ...(parent ? { parentKey: parent.key } : {}) }; onMount(() => onCleanup(anchor.registerItem(item))); return <AnchorItemContext.Provider value={item}><li {...rest} data-slot="anchor-item" data-active={anchor.activeKeys().includes(local.value) || undefined} data-highlighted={anchor.highlightedKeys().has(local.value) || undefined} class={cn(anchorItemClassName, local.class)}>{local.children}</li></AnchorItemContext.Provider> }
export function AnchorLink(props: ParentProps<JSX.ButtonHTMLAttributes<HTMLButtonElement>>) { const anchor = useAnchorContext('AnchorLink'); const item = useContext(AnchorItemContext); if (!item) throw new Error('AnchorLink must be used inside AnchorItem'); const [local, rest] = splitProps(props, ['class', 'children', 'onClick']); return <button {...rest} type={rest.type ?? 'button'} data-slot="anchor-link" data-anchor-key={item.key} data-state={anchor.activeKeys().includes(item.key) ? 'active' : 'inactive'} class={cn(anchorLinkClassName({ orientation: anchor.orientation(), active: anchor.highlightedKeys().has(item.key) }), local.class)} onClick={(event) => { if (typeof local.onClick === 'function') local.onClick(event); if (!event.defaultPrevented) anchor.activate(item) }}>{local.children}</button> }
export function AnchorRail(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) { const anchor = useAnchorContext('AnchorRail'); const [local, rest] = splitProps(props, ['class', 'children']); return <div {...rest} aria-hidden="true" data-slot="anchor-rail" class={cn(anchorRailClassName({ orientation: anchor.orientation() }), local.class)}>{local.children}</div> }
export function AnchorIndicator(props: JSX.HTMLAttributes<HTMLSpanElement>) { const anchor = useAnchorContext('AnchorIndicator'); const [local, rest] = splitProps(props, ['class', 'style']); return <For each={anchor.inkStyles()}>{(inkStyle) => <span {...rest} data-slot="anchor-indicator" class={cn(anchorIndicatorClassName({ orientation: anchor.orientation() }), local.class)} style={{ ...(typeof local.style === 'object' ? local.style : {}), top: inkStyle.top === undefined ? undefined : `${inkStyle.top}px`, left: inkStyle.left === undefined ? undefined : `${inkStyle.left}px`, width: inkStyle.width === undefined ? undefined : `${inkStyle.width}px`, height: inkStyle.height === undefined ? undefined : `${inkStyle.height}px` }} />}</For> }
export type { AnchorActiveMode, AnchorOrientation, AnchorRegisteredItem, AnchorTarget }
