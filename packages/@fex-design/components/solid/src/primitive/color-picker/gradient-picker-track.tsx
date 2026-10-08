import { formatLinearGradient } from '@fex-design/core/gradient/gradient'
import { gradientPickerTrackClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import { type JSX, type ParentProps } from 'solid-js'
import { useGradientPicker } from './color-picker-context'

export type GradientPickerTrackProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function GradientPickerTrack(props: GradientPickerTrackProps) {
  const picker = useGradientPicker()
  return (
    <div
      {...props}
      class={cn(gradientPickerTrackClassName, props.class)}
      style={{
        '--gradient-picker-background': formatLinearGradient(picker.snapshot().value),
        ...(props.style as JSX.CSSProperties),
      }}
      onPointerDown={(event) => {
        if (event.target !== event.currentTarget || picker.snapshot().disabled) return
        const rect = event.currentTarget.getBoundingClientRect()
        picker.controller.addStop((event.clientX - rect.left) / rect.width)
      }}
    >
      {props.children}
    </div>
  )
}
