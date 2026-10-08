import { colorPickerTransparencyGridClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes } from 'react'

export type ColorPickerTransparencyGridProps = HTMLAttributes<HTMLSpanElement>

export function ColorPickerTransparencyGrid({
  className,
  ...props
}: ColorPickerTransparencyGridProps) {
  return <span {...props} className={cn(colorPickerTransparencyGridClassName, className)} />
}
