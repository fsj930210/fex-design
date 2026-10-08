import { colorPickerSwatchClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import type { JSX } from 'solid-js'
import { useColorPicker } from './color-picker-context'

export type ColorPickerSwatchProps = JSX.HTMLAttributes<HTMLSpanElement> & { color?: string | undefined }

export function ColorPickerSwatch(props: ColorPickerSwatchProps) {
  const picker = useColorPicker()
  return (
    <span
      {...props}
      data-empty={!picker.snapshot().value || undefined}
      class={cn(colorPickerSwatchClassName, props.class)}
      style={{
        '--color-picker-color':
          props.color ?? picker.snapshot().value?.toString('rgb') ?? 'transparent',
        ...(props.style as JSX.CSSProperties),
      }}
    />
  )
}
