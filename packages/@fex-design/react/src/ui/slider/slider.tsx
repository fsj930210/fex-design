import type { SliderChangeMeta, SliderMarkItem, SliderPart } from '@fex-design/core/slider/types'
import { cn } from '@fex/utils'
import type { CSSProperties, ReactNode } from 'react'
import {
  SliderMark,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  type SliderRootProps,
} from '../../primitive/slider/slider'
import { useControllableState } from '../../hooks/use-controllable-state'

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
  marks?: readonly SliderMarkItem<ReactNode, CSSProperties>[]
  dots?: boolean
  included?: boolean
  classNames?: Partial<Record<SliderPart, string>>
  styles?: Partial<Record<SliderPart, CSSProperties>>
  onChange?: (value: number | number[], meta: SliderChangeMeta) => void
  onEnd?: (value: number | number[], meta: SliderChangeMeta) => void
}

const arrayValue = (value: number | readonly number[] | undefined) =>
  typeof value === 'number' ? [value] : value

export function Slider({
  value,
  defaultValue,
  disabled = false,
  marks = [],
  dots = false,
  included = true,
  className,
  style,
  classNames,
  styles,
  onChange,
  onEnd,
  ...props
}: SliderProps) {
  const values = arrayValue(value)
  const defaults = arrayValue(defaultValue)
  const [currentValues, setCurrentValues] = useControllableState<number[]>({
    value: values ? [...values] : undefined,
    defaultValue: defaults ? [...defaults] : [props.min ?? 0],
  })
  const count = currentValues.length
  const returnValue = (next: number[]) =>
    typeof value === 'number' || typeof defaultValue === 'number' ? next[0]! : next
  const rootMarks = marks.map((mark) => mark.value)
  const disabledThumbs = Array.isArray(disabled) ? disabled : undefined
  return (
    <SliderRoot
      {...props}
      {...(values
        ? { value: [...values] }
        : { defaultValue: defaults ? [...defaults] : [props.min ?? 0] })}
      disabled={disabled === true}
      disabledThumbs={disabledThumbs}
      marks={rootMarks}
      className={cn(className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
      onChange={(next, meta) => {
        if (next.length !== currentValues.length) setCurrentValues(next)
        onChange?.(returnValue(next), meta)
      }}
      onEnd={(next, meta) => onEnd?.(returnValue(next), meta)}
    >
      <SliderTrack className={classNames?.track} style={styles?.track}>
        {included && <SliderRange className={classNames?.range} style={styles?.range} />}
        {dots &&
          props.step != null &&
          Array.from(
            { length: Math.floor(((props.max ?? 100) - (props.min ?? 0)) / props.step) + 1 },
            (_, index) => (
              <SliderMark
                key={`dot-${index}`}
                value={(props.min ?? 0) + index * props.step!}
                aria-hidden="true"
              />
            ),
          )}
        {marks.map((mark) => (
          <SliderMark
            key={mark.value}
            value={mark.value}
            className={cn(classNames?.mark, mark.class)}
            style={{ ...styles?.mark, ...mark.style }}
          >
            {mark.label}
          </SliderMark>
        ))}
      </SliderTrack>
      {Array.from({ length: count }, (_, index) => (
        <SliderThumb
          key={index}
          index={index}
          disabled={disabledThumbs?.[index]}
          className={classNames?.thumb}
          style={styles?.thumb}
          aria-label={`滑块 ${index + 1}`}
        />
      ))}
    </SliderRoot>
  )
}
