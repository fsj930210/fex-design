import { colorPickerChannelTrackClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import type { JSX } from 'solid-js'

export type ColorPickerChannelTrackProps = JSX.HTMLAttributes<HTMLSpanElement>

export function ColorPickerChannelTrack(props: ColorPickerChannelTrackProps) {
  return <span {...props} class={cn(colorPickerChannelTrackClassName, props.class)} />
}
