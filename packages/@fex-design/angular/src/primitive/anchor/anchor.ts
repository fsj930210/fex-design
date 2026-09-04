import { afterNextRender, computed, DestroyRef, Directive, effect, ElementRef, inject, input, numberAttribute, output, signal } from '@angular/core'
import { createAnchorClickScrollGuard, ensureAnchorLinkVisible, getAnchorIndicatorStyles, getAnchorScrollTop, getAnchorTargetTop, getAnchorViewportHeight, isAnchorScrolledToEnd, resolveAnchorTarget } from '@fex-design/core/anchor/dom'
import { createAnchorController, getAnchorActiveKeys } from '@fex-design/core/anchor/model'
import type { AnchorActiveMode, AnchorOrientation, AnchorRegisteredItem, AnchorTarget } from '@fex-design/core/anchor/types'
import { anchorIndicatorClassName, anchorItemClassName, anchorLinkClassName, anchorListClassName, anchorRailClassName, anchorRootClassName } from '@fex-design/styles/anchor'
import { cn } from '@fex/utils'
import { createCoreStoreSignal } from '../../signals/core-store-signal'
import { createHostClassName } from '../../signals/host-class'

@Directive({
  selector: 'nav[anchorRoot]',
  standalone: true,
  host: { 'data-slot': 'anchor', '[attr.data-orientation]': 'orientation()', '[class]': 'hostClassName()' },
})
export class AnchorRoot {
  readonly activeKeys = input<readonly string[] | undefined>()
  readonly defaultActiveKeys = input<readonly string[]>([])
  readonly activeMode = input<AnchorActiveMode>('current')
  readonly orientation = input<AnchorOrientation>('vertical')
  readonly container = input<Window | HTMLElement | (() => Window | HTMLElement | null | undefined) | undefined>()
  readonly targetOffset = input(0, { transform: numberAttribute })
  readonly threshold = input(16, { transform: numberAttribute })
  readonly behavior = input<ScrollBehavior>('smooth')
  readonly change = output<{ activeKeys: readonly string[]; items: readonly AnchorRegisteredItem[] }>()
  readonly items = signal<readonly AnchorRegisteredItem[]>([])
  readonly inkStyles = signal<ReturnType<typeof getAnchorIndicatorStyles>>([])
  private readonly itemMap = new Map<string, AnchorRegisteredItem>()
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  private readonly destroyRef = inject(DestroyRef)
  private readonly controller = createAnchorController()
  private readonly clickScrollGuard = createAnchorClickScrollGuard()
  private readonly snapshot = createCoreStoreSignal(this.controller)
  readonly currentKeys = computed(() => this.activeKeys() ?? this.snapshot().activeKeys)
  readonly highlightedKeys = computed(() => {
    const result = new Set(this.currentKeys())
    for (const item of this.items()) { if (!result.has(item.key)) continue; let parentKey = item.parentKey; while (parentKey) { result.add(parentKey); parentKey = this.itemMap.get(parentKey)?.parentKey } }
    return result
  })
  protected readonly hostClassName = createHostClassName(() => anchorRootClassName({ orientation: this.orientation() }))
  constructor() {
    effect(() => {
      const activeKeys = this.activeKeys()
      this.controller.updateOptions({
        ...(activeKeys === undefined ? {} : { activeKeys }),
        defaultActiveKeys: this.defaultActiveKeys(),
      })
    })
    afterNextRender(() => {
      const container = this.resolveContainer(); let frame = 0
      const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => this.refresh()) }
      const handleScroll = () => { if (this.clickScrollGuard.shouldHandleScroll()) schedule() }
      schedule(); container.addEventListener('scroll', handleScroll, { passive: true }); window.addEventListener('resize', schedule)
      this.destroyRef.onDestroy(() => { cancelAnimationFrame(frame); container.removeEventListener('scroll', handleScroll); window.removeEventListener('resize', schedule); this.clickScrollGuard.dispose() })
    })
  }
  registerItem(item: AnchorRegisteredItem) { this.itemMap.set(item.key, item); this.items.set([...this.itemMap.values()]); requestAnimationFrame(() => this.refresh()); return () => { this.itemMap.delete(item.key); this.items.set([...this.itemMap.values()]); requestAnimationFrame(() => this.refresh()) } }
  activate(item: AnchorRegisteredItem) { const target = resolveAnchorTarget(item.target); if (!target) return; const container = this.resolveContainer(); const visible = this.visibleItems(); const index = visible.findIndex((entry) => entry.key === item.key); this.setKeys(this.activeMode() === 'progress' ? visible.slice(0, index + 1).map((entry) => entry.key) : [item.key]); this.clickScrollGuard.lock(); container.scrollTo({ top: Math.max(getAnchorTargetTop(target, container) - (item.targetOffset ?? this.targetOffset()), 0), behavior: this.behavior() }) }
  private visibleItems() { return this.orientation() === 'horizontal' ? this.items().filter((item) => !item.parentKey) : this.items() }
  private resolveContainer() { const container = this.container(); const resolved = typeof container === 'function' ? container() : container; return resolved ?? window }
  private setKeys(keys: readonly string[]) { const previous=this.controller.getSnapshot().activeKeys;if(previous.length===keys.length&&previous.every((key,index)=>key===keys[index]))return;this.controller.change(keys, []); const selected = new Set(keys); this.change.emit({ activeKeys: keys, items: this.items().filter((item) => selected.has(item.key)) }) }
  private refresh() { const container = this.resolveContainer(); const positions = this.visibleItems().flatMap((item) => { const target = resolveAnchorTarget(item.target); return target ? [{ item, top: getAnchorTargetTop(target, container) }] : [] }); this.setKeys(getAnchorActiveKeys({ positions, scrollTop: getAnchorScrollTop(container), viewportHeight: getAnchorViewportHeight(container), threshold: this.threshold(), mode: this.activeMode(), scrolledToEnd: isAnchorScrolledToEnd(container) })); ensureAnchorLinkVisible(this.element, this.currentKeys(), this.orientation()); this.inkStyles.set(getAnchorIndicatorStyles(this.element, this.currentKeys(), this.orientation())) }
}

@Directive({ selector: 'ul[anchorList]', standalone: true, host: { 'data-slot': 'anchor-list', '[class]': 'hostClassName()' } })
export class AnchorList { private readonly root = inject(AnchorRoot); protected readonly hostClassName = createHostClassName(() => anchorListClassName({ orientation: this.root.orientation() })) }

@Directive({ selector: 'li[anchorItem]', standalone: true, host: { 'data-slot': 'anchor-item', '[attr.data-active]': 'active() || null', '[attr.data-highlighted]': 'highlighted() || null', '[class]': 'hostClassName()' } })
export class AnchorItem {
  readonly value = input.required<string>()
  readonly target = input.required<AnchorTarget>()
  readonly targetOffset = input<number | undefined>()
  private readonly root = inject(AnchorRoot)
  private readonly destroyRef = inject(DestroyRef)
  private readonly parent = inject(AnchorItem, { optional: true, skipSelf: true })
  readonly record = computed<AnchorRegisteredItem>(() => {
    const targetOffset = this.targetOffset()
    return { key: this.value(), target: this.target(), ...(targetOffset === undefined ? {} : { targetOffset }), ...(this.parent ? { parentKey: this.parent.value() } : {}) }
  })
  protected readonly active = computed(() => this.root.currentKeys().includes(this.value()))
  protected readonly highlighted = computed(() => this.root.highlightedKeys().has(this.value()))
  protected readonly hostClassName = createHostClassName(() => anchorItemClassName)
  constructor() { afterNextRender(() => { const unregister = this.root.registerItem(this.record()); this.destroyRef.onDestroy(unregister) }) }
}

@Directive({ selector: 'button[anchorLink]', standalone: true, host: { type: 'button', 'data-slot': 'anchor-link', '[attr.data-anchor-key]': 'item.value()', '[attr.data-state]': "active() ? 'active' : 'inactive'", '[class]': 'hostClassName()', '(click)': 'activate($event)' } })
export class AnchorLink { private readonly root = inject(AnchorRoot); protected readonly item = inject(AnchorItem); protected readonly active = computed(() => this.root.currentKeys().includes(this.item.value())); protected readonly hostClassName = createHostClassName(() => anchorLinkClassName({ orientation: this.root.orientation(), active: this.root.highlightedKeys().has(this.item.value()) })); protected activate(event: MouseEvent) { queueMicrotask(() => { if (!event.defaultPrevented) this.root.activate(this.item.record()) }) } }

@Directive({ selector: 'div[anchorRail]', standalone: true, host: { 'aria-hidden': 'true', 'data-slot': 'anchor-rail', '[class]': 'hostClassName()' } })
export class AnchorRail { private readonly root = inject(AnchorRoot); protected readonly hostClassName = createHostClassName(() => anchorRailClassName({ orientation: this.root.orientation() })) }

@Directive({ selector: 'span[anchorIndicator]', standalone: true, host: { 'data-slot': 'anchor-indicator', '[class]': 'hostClassName()', '[style.top.px]': 'style().top', '[style.left.px]': 'style().left', '[style.width.px]': 'style().width', '[style.height.px]': 'style().height' } })
export class AnchorIndicator { private readonly root = inject(AnchorRoot); protected readonly style = computed(() => this.root.inkStyles()[0] ?? {}); protected readonly hostClassName = createHostClassName(() => anchorIndicatorClassName({ orientation: this.root.orientation() })) }

export type { AnchorActiveMode, AnchorOrientation, AnchorRegisteredItem, AnchorTarget }
