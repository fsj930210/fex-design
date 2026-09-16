import { createSliderController } from '@fex-design/core/slider/create-slider-controller'
import type {
  SliderChangeMeta,
  SliderDirection,
  SliderOrientation,
  SliderSnapshot,
} from '@fex-design/core/slider/types'
import { getSliderValueFromPointer } from '@fex-design/core/slider/utils'
import { sliderRootClassName } from '@fex-design/styles/slider'
import { cn } from '@fex/utils'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  numberAttribute,
  output,
  type Signal,
} from '@angular/core'
import { createCoreStoreSignal } from '../../signals/core-store-signal'

type SliderSize = 'sm' | 'md' | 'lg'
function numberArray(value: number[] | readonly number[] | string | number | undefined) {
  if (Array.isArray(value)) return [...value]
  if (typeof value === 'number') return [value]
  if (typeof value === 'string') {
    const values = value.split(',').map(Number).filter(Number.isFinite)
    return values.length ? values : undefined
  }
  return undefined
}

@Component({
  selector: 'div[sliderRoot]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    '[attr.data-disabled]': "allDisabled() ? '' : null",
    '[attr.data-orientation]': 'snapshot().orientation',
    '[attr.data-reverse]': "snapshot().reverse ? '' : null",
    'data-slot': 'slider',
    '(pointerdown)': 'pointerDown($event)',
    '(pointermove)': 'pointerMove($event)',
    '(pointerup)': 'pointerUp($event)',
    '(pointercancel)': 'cancel()',
    '(lostpointercapture)': 'cancel()',
  },
  template: '<ng-content />',
})
export class SliderRoot {
  readonly className = input('', { alias: 'class' })
  readonly value = input<number[] | readonly number[] | string | number | undefined>()
  readonly defaultValue = input<number[] | readonly number[] | string | number | undefined>()
  readonly min = input(0, { transform: numberAttribute })
  readonly max = input(100, { transform: numberAttribute })
  readonly step = input<number | null>(1)
  readonly marks = input<number[]>([])
  readonly minStepsBetweenThumbs = input(0, { transform: numberAttribute })
  readonly orientation = input<SliderOrientation>('horizontal')
  readonly direction = input<SliderDirection>('ltr')
  readonly reverse = input(false, { transform: booleanAttribute })
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly disabledThumbs = input<boolean[]>([])
  readonly keyboard = input(true, { transform: booleanAttribute })
  readonly draggableRange = input(false, { transform: booleanAttribute })
  readonly editable = input(false, { transform: booleanAttribute })
  readonly minCount = input(0, { transform: numberAttribute })
  readonly maxCount = input(Number.POSITIVE_INFINITY, { transform: numberAttribute })
  readonly size = input<SliderSize>('md')
  readonly change = output<{ value: number[]; meta: SliderChangeMeta }>()
  readonly end = output<{ value: number[]; meta: SliderChangeMeta }>()
  readonly controller: ReturnType<typeof createSliderController>
  readonly snapshot: Signal<SliderSnapshot>
  protected readonly allDisabled = computed(() => {
    const state = this.snapshot()
    return (
      state.disabled || (state.disabledThumbs.length > 0 && state.disabledThumbs.every(Boolean))
    )
  })
  protected readonly hostClassName = computed(() =>
    cn(
      sliderRootClassName({ size: this.size(), orientation: this.snapshot().orientation }),
      this.className(),
    ),
  )
  private dragRange = false
  private pointerOffset = 0
  constructor(private readonly host: ElementRef<HTMLDivElement>) {
    const root = this
    this.controller = createSliderController({
      get value() {
        return numberArray(root.value())
      },
      get defaultValue() {
        return numberArray(root.defaultValue())
      },
      get min() {
        return root.min()
      },
      get max() {
        return root.max()
      },
      get step() {
        return root.step()
      },
      get marks() {
        return root.marks()
      },
      get minStepsBetweenThumbs() {
        return root.minStepsBetweenThumbs()
      },
      get orientation() {
        return root.orientation()
      },
      get direction() {
        return root.direction()
      },
      get reverse() {
        return root.reverse()
      },
      get disabled() {
        return root.disabled()
      },
      get disabledThumbs() {
        return root.disabledThumbs()
      },
      get keyboard() {
        return root.keyboard()
      },
      get draggableRange() {
        return root.draggableRange()
      },
      get editable() {
        return root.editable()
      },
      get minCount() {
        return root.minCount()
      },
      get maxCount() {
        return root.maxCount()
      },
      onChange: (value, meta) => root.change.emit({ value, meta }),
      onEnd: (value, meta) => root.end.emit({ value, meta }),
    })
    const store = createCoreStoreSignal(this.controller)
    this.snapshot = computed(() => {
      store()
      return this.controller.getSnapshot()
    })
  }
  private pointerValue(event: PointerEvent) {
    const value = this.snapshot()
    return getSliderValueFromPointer(
      event.clientX,
      event.clientY,
      this.host.nativeElement.getBoundingClientRect(),
      value.min,
      value.max,
      value.orientation,
      value.direction,
      value.reverse,
    )
  }
  pointerDown(event: PointerEvent) {
    if (event.defaultPrevented || this.snapshot().disabled) return
    const target = event.target as HTMLElement
    const thumbIndex = Number(
      target.closest('[data-slot="slider-thumb"]')?.getAttribute('data-index'),
    )
    const nextValue = this.pointerValue(event)
    if (Number.isInteger(thumbIndex)) {
      this.controller.setActiveIndex(thumbIndex)
      this.pointerOffset = this.snapshot().values[thumbIndex]! - nextValue
    } else this.pointerOffset = 0
    this.host.nativeElement.setPointerCapture(event.pointerId)
    this.dragRange =
      !!target.closest('[data-slot="slider-range"]') && this.snapshot().draggableRange
    if (this.dragRange) this.controller.startRangeSlide(nextValue)
    else if (this.snapshot().editable && !target.closest('[data-slot="slider-thumb"]'))
      this.controller.addValue(nextValue)
    else
      this.controller.startSlide(
        Number.isInteger(thumbIndex) ? this.snapshot().values[thumbIndex]! : nextValue,
      )
  }
  pointerMove(event: PointerEvent) {
    if (!this.host.nativeElement.hasPointerCapture(event.pointerId)) return
    this.dragRange
      ? this.controller.moveRangeSlide(this.pointerValue(event))
      : this.controller.moveSlide(this.pointerValue(event) + this.pointerOffset)
  }
  pointerUp(event: PointerEvent) {
    if (!this.host.nativeElement.hasPointerCapture(event.pointerId)) return
    this.controller.endSlide()
    this.host.nativeElement.releasePointerCapture(event.pointerId)
  }
  cancel() {
    this.controller.cancelSlide()
  }
}

export { SliderMark, SliderRange, SliderThumb, SliderTrack } from './slider-parts'
