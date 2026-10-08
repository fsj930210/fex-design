import { getColorChannelConfig, getColorChannelValue } from '@fex-design/core/color-picker/channels'
import { valueToPosition } from '@fex-design/core/color-picker/coordinates'
import { colorPickerAreaThumbClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes } from 'react'
import { useColorPicker, useColorPickerArea } from './color-picker-context'

export type ColorPickerAreaThumbProps = HTMLAttributes<HTMLSpanElement>

export function ColorPickerAreaThumb({
  className,
  style,
  ...props
}: ColorPickerAreaThumbProps) {
  const { snapshot } = useColorPicker()
  const { xChannel: x, yChannel: y } = useColorPickerArea()
  const value = snapshot.value
  if (!value) return null
  const xc = getColorChannelConfig(x),
    yc = getColorChannelConfig(y)
  return (
    <span
      {...props}
      className={cn(colorPickerAreaThumbClassName, className)}
      style={{
        left: `${valueToPosition(getColorChannelValue(value, x), xc.min, xc.max) * 100}%`,
        top: `${valueToPosition(getColorChannelValue(value, y), yc.min, yc.max, true) * 100}%`,
        background: value.toString('rgb'),
        ...style,
      }}
    />
  )
}
