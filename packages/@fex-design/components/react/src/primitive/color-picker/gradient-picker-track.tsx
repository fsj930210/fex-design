import { formatLinearGradient } from '@fex-design/core/gradient/gradient'
import { gradientPickerTrackClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import type { CSSProperties, HTMLAttributes } from 'react'
import { useGradientPicker } from './color-picker-context'

export type GradientPickerTrackProps = HTMLAttributes<HTMLDivElement>

export function GradientPickerTrack({
  className,
  style,
  children,
  onPointerDown,
  ...props
}: GradientPickerTrackProps) {
  const { controller, snapshot } = useGradientPicker()
  return (
    <div
      {...props}
      className={cn(gradientPickerTrackClassName, className)}
      style={
        {
          '--gradient-picker-background': formatLinearGradient(snapshot.value),
          ...style,
        } as CSSProperties
      }
      onPointerDown={(e) => {
        onPointerDown?.(e)
        if (e.defaultPrevented || snapshot.disabled || e.target !== e.currentTarget) return
        const r = e.currentTarget.getBoundingClientRect()
        controller.addStop((e.clientX - r.left) / r.width)
      }}
    >
      {children}
    </div>
  )
}
