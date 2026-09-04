<script lang="ts">
  import { createAnchorClickScrollGuard, ensureAnchorLinkVisible, getAnchorIndicatorStyles, getAnchorScrollTop, getAnchorTargetTop, getAnchorViewportHeight, isAnchorScrolledToEnd, resolveAnchorTarget } from '@fex-design/core/anchor/dom'
  import { createAnchorController, getAnchorActiveKeys } from '@fex-design/core/anchor/model'
  import type { AnchorActiveMode, AnchorOrientation, AnchorRegisteredItem } from '@fex-design/core/anchor/types'
  import { anchorRootClassName } from '@fex-design/styles/anchor'
  import { cn } from '@fex/utils'
  import { onMount, setContext, tick, type Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { readableCoreStore } from '../../stores/core-store'
  import { anchorContextKey } from './context'
  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'onchange'> { activeKeys?: readonly string[]; defaultActiveKeys?: readonly string[]; activeMode?: AnchorActiveMode; orientation?: AnchorOrientation; container?: Window | HTMLElement | (() => Window | HTMLElement | null | undefined); targetOffset?: number; threshold?: number; behavior?: ScrollBehavior; onchange?: (keys: readonly string[], items: readonly AnchorRegisteredItem[]) => void; children?: Snippet }
  let { activeKeys, defaultActiveKeys = [], activeMode = 'current', orientation = 'vertical', container, targetOffset = 0, threshold = 16, behavior = 'smooth', onchange, class: className, children, ...rest }: Props = $props()
  const controller = createAnchorController({ ...(activeKeys === undefined ? {} : { activeKeys }), defaultActiveKeys })
  const clickScrollGuard = createAnchorClickScrollGuard()
  const snapshot = readableCoreStore(controller)
  const itemMap = new Map<string, AnchorRegisteredItem>()
  let items = $state<readonly AnchorRegisteredItem[]>([])
  let root: HTMLElement
  let inkStyles = $state<ReturnType<typeof getAnchorIndicatorStyles>>([])
  let currentKeys = $derived(activeKeys ?? $snapshot.activeKeys)
  let visibleItems = $derived(orientation === 'horizontal' ? items.filter((item) => !item.parentKey) : items)
  let highlightedKeys = $derived.by(() => { const result = new Set(currentKeys); for (const item of items) { if (!result.has(item.key)) continue; let parentKey = item.parentKey; while (parentKey) { result.add(parentKey); parentKey = itemMap.get(parentKey)?.parentKey } } return result })
  const resolveContainer = () => {
    const resolved = typeof container === 'function' ? container() : container
    return resolved ?? window
  }
  function change(keys: readonly string[]) { const previous=controller.getSnapshot().activeKeys; if(previous.length===keys.length&&previous.every((key,index)=>key===keys[index])) return; const activeSet = new Set(keys); controller.change(keys, []); onchange?.(keys, items.filter((item) => activeSet.has(item.key))) }
  function refreshIndicator() { if (!root) return; ensureAnchorLinkVisible(root, currentKeys, orientation); inkStyles = getAnchorIndicatorStyles(root, currentKeys, orientation) }
  function refresh() { const scrollContainer = resolveContainer(); const positions = visibleItems.flatMap((item) => { const target = resolveAnchorTarget(item.target); return target ? [{ item, top: getAnchorTargetTop(target, scrollContainer) }] : [] }); change(getAnchorActiveKeys({ positions, scrollTop: getAnchorScrollTop(scrollContainer), viewportHeight: getAnchorViewportHeight(scrollContainer), threshold, mode: activeMode, scrolledToEnd: isAnchorScrolledToEnd(scrollContainer) })); refreshIndicator() }
  function activate(item: AnchorRegisteredItem) { const target = resolveAnchorTarget(item.target); if (!target) return; const scrollContainer = resolveContainer(); const index = visibleItems.findIndex((entry) => entry.key === item.key); change(activeMode === 'progress' ? visibleItems.slice(0, index + 1).map((entry) => entry.key) : [item.key]); clickScrollGuard.lock(); scrollContainer.scrollTo({ top: Math.max(getAnchorTargetTop(target, scrollContainer) - (item.targetOffset ?? targetOffset), 0), behavior }) }
  let frame = 0
  const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(refresh) }
  const handleScroll = () => { if (clickScrollGuard.shouldHandleScroll()) schedule() }
  function registerItem(item: AnchorRegisteredItem) { itemMap.set(item.key, item); items = [...itemMap.values()]; schedule(); return () => { itemMap.delete(item.key); items = [...itemMap.values()]; schedule() } }
  setContext(anchorContextKey, { activeKeys: () => currentKeys, highlightedKeys: () => highlightedKeys, inkStyles: () => inkStyles, orientation: () => orientation, activate, registerItem })
  $effect.pre(() => controller.updateOptions({ ...(activeKeys === undefined ? {} : { activeKeys }), defaultActiveKeys }))
  $effect(() => { currentKeys; requestAnimationFrame(refreshIndicator) })
  onMount(() => {
    let mounted = true
    let removeListeners = () => {}

    // Parent element bindings settle after child initialization. Wait one Svelte tick
    // so a container accessor resolves the actual scroll element instead of window.
    void tick().then(() => {
      if (!mounted) return
      const scrollContainer = resolveContainer()
      schedule()
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', schedule)
      removeListeners = () => {
        scrollContainer.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', schedule)
      }
    })

    return () => {
      mounted = false
      cancelAnimationFrame(frame)
      removeListeners()
      clickScrollGuard.dispose()
    }
  })
</script>
<nav {...rest} bind:this={root} data-slot="anchor" data-orientation={orientation} class={cn(anchorRootClassName({ orientation }), className)}>{@render children?.()}</nav>
