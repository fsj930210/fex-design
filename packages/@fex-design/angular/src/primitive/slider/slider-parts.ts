import { convertValueToPercentage, getSliderRangeDisabledState, isSliderMarkActive, isSliderReversed } from '@fex-design/core/slider/utils'
import {
  sliderMarkClassName,
  sliderRangeClassName,
  sliderThumbClassName,
  sliderTrackClassName,
} from '@fex-design/styles/slider'
import { cn } from '@fex/utils'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core'
import { createHostClassName } from '../../signals/host-class'
import { SliderRoot } from './slider-primitive'

@Component({
  selector: 'span[sliderTrack]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    '[attr.data-orientation]': 'root.snapshot().orientation',
    '[attr.data-disabled]': "allDisabled() ? '' : null",
    'data-slot': 'slider-track',
  },
  template: '<ng-content />',
})
export class SliderTrack {
  protected readonly hostClassName = createHostClassName(sliderTrackClassName)
  protected readonly allDisabled = computed(() => {
    const state = this.root.snapshot()
    return state.disabled || (state.disabledThumbs.length > 0 && state.disabledThumbs.every(Boolean))
  })
  constructor(readonly root: SliderRoot) {}
}

@Component({
  selector: 'span[sliderRange]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    '[style.left]': 'placement().left',
    '[style.right]': 'placement().right',
    '[style.bottom]': 'placement().bottom',
    '[style.top]': 'placement().top',
    '[style.background-image]': 'disabledState().backgroundImage',
    '[attr.data-orientation]': 'root.snapshot().orientation',
    '[attr.data-disabled]': "root.snapshot().disabled || disabledState().disabled ? '' : null",
    'data-slot': 'slider-range',
  },
  template: '',
})
export class SliderRange {
  protected readonly hostClassName = createHostClassName(sliderRangeClassName)
  protected readonly disabledState = computed(() => {
    const state = this.root.snapshot()
    return getSliderRangeDisabledState(state.values, state.disabledThumbs, state.orientation, state.direction, state.reverse)
  })
  protected readonly placement = computed(() => {
    const state = this.root.snapshot()
    const points = state.values.map((value) =>
      convertValueToPercentage(value, state.min, state.max),
    )
    const start = state.values.length > 1 ? Math.min(...points) : 0
    const finish = Math.max(...points)
    const reversed = isSliderReversed(state.orientation, state.direction, state.reverse)
    const from = reversed ? 100 - finish : start
    const to = reversed ? start : 100 - finish
    return state.orientation === 'vertical'
      ? { bottom: `${from}%`, top: `${to}%`, left: null, right: null }
      : { left: `${from}%`, right: `${to}%`, bottom: null, top: null }
  })
  constructor(readonly root: SliderRoot) {}
}

@Component({
  selector: 'span[sliderThumb]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'slider',
    '[class]': 'hostClassName()',
    '[style.left]': 'placement().left',
    '[style.top]': 'placement().top',
    '[style.bottom]': 'placement().bottom',
    '[style.transform]': 'placement().transform',
    '[style.position]': "'absolute'",
    '[attr.tabindex]': 'isDisabled() ? null : 0',
    '[attr.aria-valuemin]': 'root.snapshot().min',
    '[attr.aria-valuemax]': 'root.snapshot().max',
    '[attr.aria-valuenow]': 'currentValue()',
    '[attr.aria-orientation]': 'root.snapshot().orientation',
    '[attr.aria-disabled]': "isDisabled() ? 'true' : null",
    '[attr.data-disabled]': "isDisabled() ? '' : null",
    '[attr.data-index]': 'index()',
    'data-slot': 'slider-thumb',
    '(focus)': 'root.controller.setActiveIndex(index())',
    '(keydown)': 'keyDown($event)',
    '(keyup)': 'root.controller.endSlide()',
  },
  template: '<ng-content />',
})
export class SliderThumb {
  readonly index = input(0, { transform: numberAttribute })
  readonly disabled = input(false, { transform: booleanAttribute })
  protected readonly hostClassName = createHostClassName(sliderThumbClassName)
  protected readonly currentValue = computed(
    () => this.root.snapshot().values[this.index()] ?? this.root.snapshot().min,
  )
  protected readonly isDisabled = computed(
    () =>
      this.root.snapshot().disabled ||
      this.root.snapshot().disabledThumbs[this.index()] ||
      this.disabled(),
  )
  protected readonly placement = computed(() => {
    const state = this.root.snapshot()
    let point = convertValueToPercentage(this.currentValue(), state.min, state.max)
    if (isSliderReversed(state.orientation, state.direction, state.reverse)) point = 100 - point
    return state.orientation === 'vertical'
      ? { bottom: `${point}%`, left: '50%', top: null, transform: 'translate(-50%,50%)' }
      : { top: '50%', left: `${point}%`, bottom: null, transform: 'translate(-50%,-50%)' }
  })
  constructor(readonly root: SliderRoot) {}
  keyDown(event: KeyboardEvent) {
    const state = this.root.snapshot()
    if (this.isDisabled() || !state.keyboard) return
    const directions: Record<string, number> = {
      ArrowRight: 1,
      ArrowUp: 1,
      ArrowLeft: -1,
      ArrowDown: -1,
      PageUp: 10,
      PageDown: -10,
    }
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      this.root.controller.setValueAt(this.index(), event.key === 'Home' ? state.min : state.max, {
        source: 'keyboard',
      })
    } else if (event.key in directions) {
      event.preventDefault()
      const direction = directions[event.key]!
      const visualDirection =
        isSliderReversed(state.orientation, state.direction, state.reverse) &&
        event.key.startsWith('Arrow')
          ? -direction
          : direction
      this.root.controller.stepThumb(
        this.index(),
        Math.sign(visualDirection),
        Math.abs(visualDirection),
      )
    } else if ((event.key === 'Delete' || event.key === 'Backspace') && state.editable) {
      event.preventDefault()
      this.root.controller.removeValue(this.index())
    }
  }
}

@Component({
  selector: 'span[sliderMark]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    '[style.left]': 'placement().left',
    '[style.bottom]': 'placement().bottom',
    '[attr.data-active]': "active() ? 'true' : 'false'",
    '[attr.data-edge]': 'edge()',
    '[attr.data-orientation]': 'root.snapshot().orientation',
    'data-slot': 'slider-mark',
  },
  template: '<span><ng-content /></span>',
})
export class SliderMark {
  readonly value = input(0, { transform: numberAttribute })
  protected readonly hostClassName = createHostClassName(sliderMarkClassName)
  protected readonly active = computed(() =>
    isSliderMarkActive(this.root.snapshot().values, this.value()),
  )
  protected readonly edge = computed(() => {
    const state = this.root.snapshot()
    let point = convertValueToPercentage(this.value(), state.min, state.max)
    if (isSliderReversed(state.orientation, state.direction, state.reverse)) point = 100 - point
    return point === 0 ? 'start' : point === 100 ? 'end' : null
  })
  protected readonly placement = computed(() => {
    const state = this.root.snapshot()
    let point = convertValueToPercentage(this.value(), state.min, state.max)
    if (isSliderReversed(state.orientation, state.direction, state.reverse)) point = 100 - point
    return state.orientation === 'vertical'
      ? { bottom: `${point}%`, left: null }
      : { left: `${point}%`, bottom: null }
  })
  constructor(readonly root: SliderRoot) {}
}
