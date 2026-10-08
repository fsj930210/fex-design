import { getColorChannelConfig } from '@fex-design/core/color-picker/channels'
import { positionToValue } from '@fex-design/core/color-picker/coordinates'
import type { ColorChannel } from '@fex-design/core/color-picker/types'
import { colorPickerAreaClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import { useRef, type CSSProperties, type HTMLAttributes, type PointerEvent, type Ref } from 'react'
import { ColorPickerAreaContext, useColorPicker } from './color-picker-context'

function areaBackground(x: ColorChannel, y: ColorChannel, color: string) {
  if (x === 'hsb-saturation' && y === 'hsb-brightness')
    return `linear-gradient(to top,black,transparent),linear-gradient(to right,white,transparent),${color}`
  if (x === 'oklch-chroma' && y === 'oklch-lightness')
    return `linear-gradient(to top,oklch(0 0 0),transparent),linear-gradient(to right,oklch(0.5 0 0),${color})`
  return color
}

export interface ColorPickerAreaProps extends HTMLAttributes<HTMLDivElement> {
  xChannel: ColorChannel
  yChannel: ColorChannel
  ref?: Ref<HTMLDivElement>
}

export function ColorPickerArea({
  xChannel,
  yChannel,
  className,
  style,
  children,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  ref,
  ...props
}: ColorPickerAreaProps) {
  const { controller, snapshot } = useColorPicker()
  const own = useRef<HTMLDivElement | null>(null)
  const color = snapshot.value?.toString('oklch') ?? 'transparent'
  const update = (event: PointerEvent<HTMLDivElement>) => {
    if (!own.current) return
    const r = own.current.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (event.clientX - r.left) / r.width))
    const y = Math.min(1, Math.max(0, (event.clientY - r.top) / r.height))
    const xc = getColorChannelConfig(xChannel),
      yc = getColorChannelConfig(yChannel)
    controller.setAreaChannels(
      xChannel,
      positionToValue(x, xc.min, xc.max),
      yChannel,
      positionToValue(y, yc.min, yc.max, true),
    )
  }
  return (
    <ColorPickerAreaContext value={{ xChannel, yChannel }}>
      <div
        {...props}
        ref={(node) => {
          own.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        data-disabled={snapshot.disabled || undefined}
        className={cn(colorPickerAreaClassName, className)}
        style={
          {
            '--color-picker-area-background': areaBackground(xChannel, yChannel, color),
            ...style,
          } as CSSProperties
        }
        onPointerDown={(e) => {
          onPointerDown?.(e)
          if (e.defaultPrevented || snapshot.disabled) return
          e.currentTarget.setPointerCapture(e.pointerId)
          controller.beginInteraction({ source: 'area' })
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
    </ColorPickerAreaContext>
  )
}
