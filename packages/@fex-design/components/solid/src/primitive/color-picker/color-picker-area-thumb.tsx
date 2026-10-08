import { getColorChannelConfig, getColorChannelValue } from '@fex-design/core/color-picker/channels'
import { valueToPosition } from '@fex-design/core/color-picker/coordinates'
import { colorPickerAreaThumbClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import type { JSX } from 'solid-js'
import { useArea, useColorPicker } from './color-picker-context'

export type ColorPickerAreaThumbProps = JSX.HTMLAttributes<HTMLSpanElement>

export function ColorPickerAreaThumb(props: ColorPickerAreaThumbProps) {
  const picker = useColorPicker(),
    area = useArea()
  const style = () => {
    const value = picker.snapshot().value
    if (!value) return { display: 'none' }
    const x = area.x(),
      y = area.y(),
      xc = getColorChannelConfig(x),
      yc = getColorChannelConfig(y)
    return {
      left: String(valueToPosition(getColorChannelValue(value, x), xc.min, xc.max) * 100) + '%',
      top:
        String(valueToPosition(getColorChannelValue(value, y), yc.min, yc.max, true) * 100) + '%',
      background: value.toString('rgb'),
    }
  }
  return (
    <span
      {...props}
      class={cn(colorPickerAreaThumbClassName, props.class)}
      style={{ ...style(), ...(props.style as JSX.CSSProperties) }}
    />
  )
}
