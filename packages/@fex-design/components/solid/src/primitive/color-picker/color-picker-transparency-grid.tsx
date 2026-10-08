import { colorPickerTransparencyGridClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import type { JSX } from 'solid-js'

export type ColorPickerTransparencyGridProps = JSX.HTMLAttributes<HTMLSpanElement>

export function ColorPickerTransparencyGrid(props: ColorPickerTransparencyGridProps) {
  return <span {...props} class={cn(colorPickerTransparencyGridClassName, props.class)} />
}
