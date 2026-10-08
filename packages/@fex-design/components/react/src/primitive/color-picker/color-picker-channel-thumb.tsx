import { getColorChannelConfig, getColorChannelValue } from '@fex-design/core/color-picker/channels'
import { valueToPosition } from '@fex-design/core/color-picker/coordinates'
import { colorPickerChannelThumbClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes } from 'react'
import { useColorPicker, useColorPickerChannel } from './color-picker-context'

export type ColorPickerChannelThumbProps = HTMLAttributes<HTMLSpanElement>

export function ColorPickerChannelThumb({
  className,
  style,
  ...props
}: ColorPickerChannelThumbProps) {
  const { snapshot } = useColorPicker()
  const channel = useColorPickerChannel()
  if (!snapshot.value) return null
  const c = getColorChannelConfig(channel)
  const p = valueToPosition(getColorChannelValue(snapshot.value, channel), c.min, c.max)
  return (
    <span
      {...props}
      className={cn(colorPickerChannelThumbClassName, className)}
      style={{
        left: `clamp(6px, ${p * 100}%, calc(100% - 6px))`,
        top: '50%',
        transform: 'translate(-50%,-50%)',
        ...style,
      }}
    />
  )
}
