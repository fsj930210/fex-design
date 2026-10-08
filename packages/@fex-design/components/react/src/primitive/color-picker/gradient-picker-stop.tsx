import { gradientPickerStopClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import type { CSSProperties, HTMLAttributes } from 'react'
import { useGradientPicker } from './color-picker-context'

export interface GradientPickerStopProps extends HTMLAttributes<HTMLButtonElement> {
  id: string
}

export function GradientPickerStop({
  id,
  className,
  style,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  ...props
}: GradientPickerStopProps) {
  const { controller, snapshot } = useGradientPicker()
  const stop = snapshot.value.stops.find((s) => s.id === id)
  if (!stop) return null
  return (
    <button
      {...props}
      type="button"
      data-selected={snapshot.selectedStopId === id || undefined}
      disabled={snapshot.disabled}
      className={cn(gradientPickerStopClassName, className)}
      style={
        {
          left: `clamp(6px, ${stop.position * 100}%, calc(100% - 6px))`,
          '--gradient-stop-color': stop.color.toString('rgb'),
          ...style,
        } as CSSProperties
      }
      onPointerDown={(e) => {
        onPointerDown?.(e)
        if (e.defaultPrevented) return
        e.currentTarget.setPointerCapture(e.pointerId)
        controller.selectStop(id)
        controller.beginInteraction('stop-move')
      }}
      onPointerMove={(e) => {
        onPointerMove?.(e)
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
        const r = e.currentTarget.parentElement!.getBoundingClientRect()
        controller.moveStop(id, (e.clientX - r.left) / r.width)
      }}
      onPointerUp={(e) => {
        onPointerUp?.(e)
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId)
          controller.completeInteraction()
        }
      }}
    />
  )
}
