import { colorPickerSwatchClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import type { CSSProperties, HTMLAttributes } from 'react'
import { useColorPicker } from './color-picker-context'
import { ColorPickerTransparencyGrid } from './color-picker-transparency-grid'

export interface ColorPickerSwatchProps extends HTMLAttributes<HTMLSpanElement> {
  color?: string
}

export function ColorPickerSwatch({
  color,
  className,
  style,
  ...props
}: ColorPickerSwatchProps) {
  const { snapshot } = useColorPicker()
  const value = color ?? snapshot.value?.toString('rgb') ?? 'transparent'
  return (
    <span
      {...props}
      data-empty={!snapshot.value || undefined}
      className={cn(colorPickerSwatchClassName, className)}
      style={{ '--color-picker-color': value, ...style } as CSSProperties}
    >
      <ColorPickerTransparencyGrid />
    </span>
  )
}
