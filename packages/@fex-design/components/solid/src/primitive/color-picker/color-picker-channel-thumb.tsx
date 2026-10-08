import { getColorChannelConfig, getColorChannelValue } from '@fex-design/core/color-picker/channels'
import { valueToPosition } from '@fex-design/core/color-picker/coordinates'
import { colorPickerChannelThumbClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import type { JSX } from 'solid-js'
import { useChannel, useColorPicker } from './color-picker-context'

export type ColorPickerChannelThumbProps = JSX.HTMLAttributes<HTMLSpanElement>

export function ColorPickerChannelThumb(props: ColorPickerChannelThumbProps) {
  const picker = useColorPicker(),
    channel = useChannel()
  const style = () => {
    const value = picker.snapshot().value
    if (!value) return { display: 'none' }
    const c = getColorChannelConfig(channel()),
      p = valueToPosition(getColorChannelValue(value, channel()), c.min, c.max)
    return {
      left: 'clamp(6px, ' + String(p * 100) + '%, calc(100% - 6px))',
      top: '50%',
      transform: 'translate(-50%,-50%)',
    }
  }
  return (
    <span
      {...props}
      class={cn(colorPickerChannelThumbClassName, props.class)}
      style={{ ...style(), ...(props.style as JSX.CSSProperties) }}
    />
  )
}
