import type { ScrollbarRootOptions } from '@fex-design/core/scrollbar/types'
import type { NativeAttributes } from '@fex-design/angular/directives/native-attributes'
import { cn } from '@fex-design/utils'
import {
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  booleanAttribute,
  signal,
  TemplateRef,
  ViewChild,
  ViewChildren,
  QueryList,
  effect,
  type AfterViewInit,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import type { TimePickerOption, TimePeriod } from '@fex-design/core/time-picker/types'
import { getNextTimeOption } from '@fex-design/core/time-picker/navigation'
import { getTimePickerScrollBehavior } from '@fex-design/core/time-picker/scroll'
import {
  timePickerColumnClassName,
  timePickerColumnItemClassName,
  timePickerColumnSpacerClassName,
  timePickerColumnViewportClassName,
} from '@fex-design/components-styles/time-picker'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { TimePickerRoot } from './time-picker-root'

export type ColumnValue = number | TimePeriod
export interface TimePickerItemContext<T extends ColumnValue = ColumnValue> {
  item: TimePickerOption<T>
  selected: boolean
  active: boolean
}

export type TimePickerScrollbarProps = Omit<
  ScrollbarRootOptions,
  'disabled' | 'overflow' | 'onScroll'
> &
  Pick<NativeAttributes, 'class' | 'style'>
export type TimePickerColumnCustomization = Pick<NativeAttributes, 'class' | 'style'> & {
  scrollbarProps?: TimePickerScrollbarProps | undefined
  step?: number | undefined
  disabled?: boolean | undefined
}

@Directive()
export abstract class TimePickerColumnBase<T extends ColumnValue> implements AfterViewInit {
  readonly class = input<string>()
  readonly scrollbarProps = input<TimePickerScrollbarProps>()
  readonly scrollbarClass = computed(() => cn('size-full', this.scrollbarProps()?.class))
  readonly itemClass = input<string>()
  readonly itemStyle = input<Record<string, string | number | null | undefined>>()
  readonly selectedItemClass = input<string>()
  readonly selectedItemStyle = input<Record<string, string | number | null | undefined>>()
  itemClasses(selected: boolean) {
    return [this.itemClassName, this.itemClass(), selected ? this.selectedItemClass() : '']
      .filter(Boolean)
      .join(' ')
  }
  itemStyles(selected: boolean) {
    return { ...this.itemStyle(), ...(selected ? this.selectedItemStyle() : undefined) }
  }
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly itemTemplate = input<TemplateRef<TimePickerItemContext<T>>>()
  protected readonly root = inject(TimePickerRoot)
  private readonly destroyRef = inject(DestroyRef)
  @ViewChild('scrollViewport', { read: ElementRef }) scrollViewport?: ElementRef<HTMLElement>
  @ViewChildren('itemElement', { read: ElementRef }) itemElements?: QueryList<
    ElementRef<HTMLButtonElement>
  >
  readonly activeValue = signal<T | undefined>(undefined)
  readonly resolvedDisabled = computed(() => this.root.disabled() || this.disabled())
  abstract readonly options: () => readonly TimePickerOption<T>[]
  abstract readonly selectedValue: () => T | undefined
  abstract commit(value: T): void
  protected readonly itemClassName = timePickerColumnItemClassName
  protected readonly spacerClassName = timePickerColumnSpacerClassName
  protected readonly viewportClassName = timePickerColumnViewportClassName
  protected readonly hostClassName = createHostClassName(timePickerColumnClassName, () =>
    this.class(),
  )
  constructor() {
    // The core snapshot and Popover mount state synchronize imperative DOM scrolling.
    effect(() => {
      const selected = this.selectedValue()
      const request = this.root.snapshot().scrollRequest
      this.root.popover.snapshot().open
      queueMicrotask(() => this.scrollTo(selected, request?.behavior ?? 'auto'))
    })
  }
  ngAfterViewInit() {
    this.itemElements?.changes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.scrollTo(this.selectedValue(), 'auto'))
    this.scrollTo(this.selectedValue(), 'auto')
  }
  select(item: TimePickerOption<T>) {
    if (this.resolvedDisabled() || this.root.readOnly() || item.disabled) return
    this.activeValue.set(item.value)
    this.commit(item.value)
  }
  handleKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented || this.resolvedDisabled() || this.root.readOnly()) return
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const next = getNextTimeOption(
      this.options(),
      this.activeValue(),
      this.selectedValue(),
      event.key === 'ArrowDown' ? 1 : -1,
    )
    if (next === undefined) return
    this.activeValue.set(next)
    this.itemElements
      ?.get(this.options().findIndex((item) => item.value === next))
      ?.nativeElement.focus()
  }
  private scrollTo(value: T | undefined, behavior: ScrollBehavior) {
    if (value === undefined) return
    const index = this.options().findIndex((item) => item.value === value)
    const element = this.itemElements?.get(index)?.nativeElement
    if (element)
      this.scrollViewport?.nativeElement.scrollTo({
        top: element.offsetTop,
        behavior: getTimePickerScrollBehavior(behavior),
      })
  }
}

export const columnHost = {
  'data-slot': 'time-picker-column',
  role: 'listbox',
  '[class]': 'hostClassName()',
  '[attr.tabindex]': 'resolvedDisabled() ? -1 : 0',
  '[attr.aria-disabled]': 'resolvedDisabled() || null',
  '[attr.data-disabled]': "resolvedDisabled() ? 'true' : null",
  '(keydown)': 'handleKeydown($event)',
}
