import { colorPickerChannelTrackClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes } from 'react'

export type ColorPickerChannelTrackProps = HTMLAttributes<HTMLSpanElement>

export function ColorPickerChannelTrack({ className, ...props }: ColorPickerChannelTrackProps) {
  return <span {...props} className={cn(colorPickerChannelTrackClassName, className)} />
}
