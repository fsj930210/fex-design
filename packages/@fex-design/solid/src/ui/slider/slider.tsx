import type { SliderChangeMeta, SliderMarkItem, SliderPart } from '@fex-design/core/slider/types'
import { cn } from '@fex/utils'
import { createSignal, For, type JSX } from 'solid-js'
import {
  SliderMark,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  type SliderRootProps,
} from '../../primitive/slider/slider'

export interface SliderProps extends Omit<
  SliderRootProps,
  | 'value'
  | 'defaultValue'
  | 'disabled'
  | 'disabledThumbs'
  | 'marks'
  | 'children'
  | 'onChange'
  | 'onEnd'
> {
  value?: number | readonly number[]
  defaultValue?: number | readonly number[]
  disabled?: boolean | readonly boolean[]
  marks?: readonly SliderMarkItem<JSX.Element, JSX.CSSProperties>[]
  dots?: boolean
  included?: boolean
  classNames?: Partial<Record<SliderPart, string>>
  styles?: Partial<Record<SliderPart, JSX.CSSProperties>>
  onChange?: (value: number | number[], meta: SliderChangeMeta) => void
  onEnd?: (value: number | number[], meta: SliderChangeMeta) => void
}
const arrayValue = (value: number | readonly number[] | undefined) =>
  typeof value === 'number' ? [value] : value
export function Slider(props: SliderProps) {
  const values = () => arrayValue(props.value)
  const defaults = () => arrayValue(props.defaultValue)
  const [internalValues, setInternalValues] = createSignal<number[]>([
    ...(defaults() ?? [props.min ?? 0]),
  ])
  const currentValues = () => (values() ? [...values()!] : internalValues())
  const count = () => currentValues().length
  const disabledThumbs = () => (Array.isArray(props.disabled) ? props.disabled : [])
  const returnValue = (value: number[]) =>
    typeof props.value === 'number' || typeof props.defaultValue === 'number' ? value[0]! : value
  return (
    <SliderRoot
      {...props}
      {...(values()
        ? { value: [...values()!] }
        : { defaultValue: [...(defaults() ?? [props.min ?? 0])] })}
      disabled={props.disabled === true}
      disabledThumbs={disabledThumbs()}
      marks={(props.marks ?? []).map((mark) => mark.value)}
      class={cn(props.class, props.classNames?.root)}
      style={{ ...(typeof props.style === 'object' ? props.style : {}), ...props.styles?.root }}
      onChange={(value, meta) => {
        if (value.length !== currentValues().length) setInternalValues(value)
        props.onChange?.(returnValue(value), meta)
      }}
      onEnd={(value, meta) => props.onEnd?.(returnValue(value), meta)}
    >
      <SliderTrack class={props.classNames?.track} style={props.styles?.track}>
        {(props.included ?? true) && (
          <SliderRange class={props.classNames?.range} style={props.styles?.range} />
        )}
        <For
          each={
            props.dots && props.step
              ? Array.from(
                  { length: Math.floor(((props.max ?? 100) - (props.min ?? 0)) / props.step) + 1 },
                  (_, index) => (props.min ?? 0) + index * props.step!,
                )
              : []
          }
        >
          {(dot) => <SliderMark value={dot} aria-hidden="true" />}
        </For>
        <For each={props.marks ?? []}>
          {(mark) => (
            <SliderMark
              value={mark.value}
              class={cn(props.classNames?.mark, mark.class)}
              style={{ ...props.styles?.mark, ...mark.style }}
            >
              {mark.label}
            </SliderMark>
          )}
        </For>
      </SliderTrack>
      <For each={Array.from({ length: count() }, (_, index) => index)}>
        {(index) => (
          <SliderThumb
            index={index}
            disabled={disabledThumbs()[index]}
            class={props.classNames?.thumb}
            style={props.styles?.thumb}
            aria-label={`滑块 ${index + 1}`}
          />
        )}
      </For>
    </SliderRoot>
  )
}
