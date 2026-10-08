import { getColorChannelConfig } from '@fex-design/core/color-picker/channels'
import { positionToValue } from '@fex-design/core/color-picker/coordinates'
import type { ColorChannel } from '@fex-design/core/color-picker/types'
import { colorPickerChannelClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import { useRef, type CSSProperties, type HTMLAttributes, type PointerEvent } from 'react'
import { ColorPickerChannelContext, useColorPicker } from './color-picker-context'

export interface ColorPickerChannelProps extends HTMLAttributes<HTMLDivElement> {
  channel: ColorChannel
  orientation?: 'horizontal' | 'vertical'
}

function channelBackground(channel: ColorChannel, value: string) {
  if (channel.endsWith('hue')) return 'linear-gradient(to right,red,#ff0,lime,cyan,blue,#f0f,red)'
  if (channel === 'alpha') return `linear-gradient(to right,transparent,${value})`
  return `linear-gradient(to right,black,${value},white)`
}

export function ColorPickerChannel({
  channel,
  orientation = 'horizontal',
  className,
  style,
  children,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  ...props
}: ColorPickerChannelProps) {
  const { controller, snapshot } = useColorPicker()
  const own = useRef<HTMLDivElement | null>(null)
  const config = getColorChannelConfig(channel)
  const update = (e: PointerEvent<HTMLDivElement>) => {
    if (!own.current) return
    const r = own.current.getBoundingClientRect()
    const p =
      orientation === 'vertical'
        ? 1 - (e.clientY - r.top) / r.height
        : (e.clientX - r.left) / r.width
    controller.setChannel(
      channel,
      positionToValue(Math.min(1, Math.max(0, p)), config.min, config.max),
      'channel',
    )
  }
  return (
    <ColorPickerChannelContext value={channel}>
      <div
        {...props}
        ref={own}
        data-disabled={snapshot.disabled || undefined}
        data-orientation={orientation}
        className={cn(colorPickerChannelClassName, className)}
        style={
          {
            '--color-picker-channel-background': channelBackground(
              channel,
              snapshot.value?.toString('rgb') ?? 'transparent',
            ),
            ...style,
          } as CSSProperties
        }
        onPointerDown={(e) => {
          onPointerDown?.(e)
          if (e.defaultPrevented || snapshot.disabled) return
          e.currentTarget.setPointerCapture(e.pointerId)
          controller.beginInteraction({ source: 'channel' })
          update(e)
        }}
        onPointerMove={(e) => {
          onPointerMove?.(e)
          if (e.currentTarget.hasPointerCapture(e.pointerId)) update(e)
        }}
        onPointerUp={(e) => {
          onPointerUp?.(e)
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId)
            controller.completeInteraction()
          }
        }}
      >
        {children}
      </div>
    </ColorPickerChannelContext>
  )
}
