import type { SnapshotStore } from '../store/create-store'

export type SliderOrientation = 'horizontal' | 'vertical'
export type SliderDirection = 'ltr' | 'rtl'
export type SliderChangeSource = 'pointer' | 'keyboard' | 'range' | 'add' | 'remove'
export type SliderPart = 'root' | 'track' | 'range' | 'thumb' | 'mark'

export interface SliderMarkItem<Content = unknown, Style = unknown> {
  value: number
  label?: Content | undefined
  class?: string | undefined
  style?: Style | undefined
}

export interface SliderUiOptions<Content = unknown, Style = unknown> {
  marks?: readonly SliderMarkItem<Content, Style>[] | undefined
  dots?: boolean | undefined
  included?: boolean | undefined
  classNames?: Partial<Record<SliderPart, string>> | undefined
  styles?: Partial<Record<SliderPart, Style>> | undefined
}

export interface SliderChangeMeta {
  previousValues: number[]
  values: number[]
  changedIndex: number | null
  source: SliderChangeSource
}

export interface SliderSnapshot {
  values: number[]
  disabled: boolean
  disabledThumbs: boolean[]
  min: number
  max: number
  step: number | null
  marks: number[]
  minStepsBetweenThumbs: number
  activeIndex: number
  orientation: SliderOrientation
  direction: SliderDirection
  reverse: boolean
  keyboard: boolean
  draggableRange: boolean
  editable: boolean
  minCount: number
  maxCount: number
}

export interface SliderOptions {
  value?: readonly number[] | undefined
  defaultValue?: readonly number[] | undefined
  disabled?: boolean | undefined
  disabledThumbs?: readonly boolean[] | undefined
  min?: number | undefined
  max?: number | undefined
  step?: number | null | undefined
  marks?: readonly number[] | undefined
  minStepsBetweenThumbs?: number | undefined
  orientation?: SliderOrientation | undefined
  direction?: SliderDirection | undefined
  reverse?: boolean | undefined
  keyboard?: boolean | undefined
  draggableRange?: boolean | undefined
  editable?: boolean | undefined
  minCount?: number | undefined
  maxCount?: number | undefined
  onChange?: ((values: number[], meta: SliderChangeMeta) => void) | undefined
  onEnd?: ((values: number[], meta: SliderChangeMeta) => void) | undefined
}

export interface SliderController extends SnapshotStore<SliderSnapshot> {
  syncSnapshot: () => void
  startSlide: (value: number, source?: SliderChangeSource) => SliderChangeMeta | undefined
  startRangeSlide: (value: number) => void
  moveSlide: (value: number) => SliderChangeMeta | undefined
  moveRangeSlide: (value: number) => SliderChangeMeta | undefined
  endSlide: () => SliderChangeMeta | undefined
  cancelSlide: () => void
  setValueAt: (
    index: number,
    value: number,
    options?: { end?: boolean; source?: SliderChangeSource },
  ) => SliderChangeMeta | undefined
  stepThumb: (
    index: number,
    direction: number,
    multiplier?: number,
    end?: boolean,
  ) => SliderChangeMeta | undefined
  addValue: (value: number) => SliderChangeMeta | undefined
  removeValue: (index: number) => SliderChangeMeta | undefined
  setActiveIndex: (index: number) => void
}
