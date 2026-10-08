import { gradientPickerStopClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import type { JSX } from 'solid-js'
import { useGradientPicker } from './color-picker-context'

export type GradientPickerStopProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & { id: string }

export function GradientPickerStop(props: GradientPickerStopProps) {
  const picker = useGradientPicker(),
    stop = () => picker.snapshot().value.stops.find((item) => item.id === props.id)
  return (
    <button
      {...props}
      type="button"
      disabled={picker.snapshot().disabled}
      data-selected={picker.snapshot().selectedStopId === props.id || undefined}
      class={cn(gradientPickerStopClassName, props.class)}
      style={{
        left: `clamp(6px, ${(stop()?.position ?? 0) * 100}%, calc(100% - 6px))`,
        '--gradient-stop-color': stop()?.color.toString('rgb') ?? 'transparent',
        ...(props.style as JSX.CSSProperties),
      }}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId)
        picker.controller.selectStop(props.id)
        picker.controller.beginInteraction('stop-move')
      }}
      onPointerMove={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
        const rect = event.currentTarget.parentElement!.getBoundingClientRect()
        picker.controller.moveStop(props.id, (event.clientX - rect.left) / rect.width)
      }}
      onPointerUp={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId)
          picker.controller.completeInteraction()
        }
      }}
    />
  )
}
