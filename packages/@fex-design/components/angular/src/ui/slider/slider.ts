import type { SliderChangeMeta, SliderPart } from '@fex-design/core/slider/types'
import {
  sliderMarkClassName,
  sliderRangeClassName,
  sliderRootClassName,
  sliderThumbClassName,
  sliderTrackClassName,
} from '@fex-design/components-styles/slider'
import { cn } from '@fex-design/utils'
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core'
import {
  SliderMark,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/angular/primitive/slider/slider-primitive'
type SliderValue = number | number[]
export interface SliderMarkItem {
  value: number
  label?: string
  class?: string
  style?: string
}

@Component({
  selector: 'div[slider]',
  standalone: true,
  host: { style: 'display: contents', '[class]': "''" },
  imports: [SliderRoot, SliderTrack, SliderRange, SliderThumb, SliderMark],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './slider.html',
})
export class Slider {
  readonly className = input('', { alias: 'class' })
  readonly value = input<SliderValue | undefined>()
  readonly defaultValue = input<SliderValue | undefined>()
  readonly min = input(0)
  readonly max = input(100)
  readonly step = input<number | null>(1)
  readonly marks = input<SliderMarkItem[]>([])
  readonly dots = input(false)
  readonly included = input(true)
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal')
  readonly direction = input<'ltr' | 'rtl'>('ltr')
  readonly reverse = input(false)
  readonly disabled = input<boolean | boolean[]>(false)
  readonly keyboard = input(true)
  readonly minStepsBetweenThumbs = input(0)
  readonly draggableRange = input(false)
  readonly editable = input(false)
  readonly minCount = input(0)
  readonly maxCount = input(Number.POSITIVE_INFINITY)
  readonly size = input<'sm' | 'md' | 'lg'>('md')
  readonly classNames = input<Partial<Record<SliderPart, string>>>({})
  readonly styles = input<Partial<Record<SliderPart, string>>>({})
  readonly change = output<{ value: SliderValue; meta: SliderChangeMeta }>()
  readonly end = output<{ value: SliderValue; meta: SliderChangeMeta }>()
  protected readonly internalValues = signal<number[]>([])
  protected readonly arrayValue = computed(() =>
    typeof this.value() === 'number'
      ? [this.value() as number]
      : (this.value() as number[] | undefined),
  )
  protected readonly arrayDefault = computed(() =>
    typeof this.defaultValue() === 'number'
      ? [this.defaultValue() as number]
      : (this.defaultValue() as number[] | undefined),
  )
  protected readonly currentValues = computed(
    () =>
      this.arrayValue() ??
      (this.internalValues().length > 0
        ? this.internalValues()
        : (this.arrayDefault() ?? [this.min()])),
  )
  protected readonly disabledThumbs = computed(() =>
    Array.isArray(this.disabled()) ? (this.disabled() as boolean[]) : [],
  )
  protected readonly markValues = computed(() => this.marks().map((mark) => mark.value))
  protected readonly rootClass = computed(() =>
    cn(
      sliderRootClassName({ size: this.size(), orientation: this.orientation() }),
      this.classNames().root,
      this.className(),
    ),
  )
  protected readonly trackClass = computed(() => cn(sliderTrackClassName, this.classNames().track))
  protected readonly rangeClass = computed(() => cn(sliderRangeClassName, this.classNames().range))
  protected readonly thumbClass = computed(() => cn(sliderThumbClassName, this.classNames().thumb))
  protected readonly markClass = computed(() => cn(sliderMarkClassName, this.classNames().mark))
  protected readonly dotValues = computed(() =>
    this.dots() && this.step()
      ? Array.from(
          { length: Math.floor((this.max() - this.min()) / this.step()!) + 1 },
          (_, index) => this.min() + index * this.step()!,
        )
      : [],
  )
  protected result(value: number[]) {
    return typeof this.value() === 'number' || typeof this.defaultValue() === 'number'
      ? value[0]!
      : value
  }
  protected mergeStyles(...values: Array<string | undefined>) {
    const result = values.filter(Boolean).join(';')
    return result || null
  }
  protected handleChange(event: { value: number[]; meta: SliderChangeMeta }) {
    if (event.value.length !== this.currentValues().length) this.internalValues.set(event.value)
    this.change.emit({ value: this.result(event.value), meta: event.meta })
  }
  protected handleEnd(event: { value: number[]; meta: SliderChangeMeta }) {
    this.end.emit({ value: this.result(event.value), meta: event.meta })
  }
}

