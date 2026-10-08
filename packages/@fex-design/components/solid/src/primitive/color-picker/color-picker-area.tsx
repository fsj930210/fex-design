import { getColorChannelConfig } from '@fex-design/core/color-picker/channels'
import { positionToValue } from '@fex-design/core/color-picker/coordinates'
import type { ColorChannel } from '@fex-design/core/color-picker/types'
import { colorPickerAreaClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { AreaContext, useColorPicker } from './color-picker-context'

export type ColorPickerAreaProps = ParentProps<
  JSX.HTMLAttributes<HTMLDivElement> & { xChannel: ColorChannel; yChannel: ColorChannel }
>

export function ColorPickerArea(props: ColorPickerAreaProps) {
  const [local, rest] = splitProps(props, ['xChannel', 'yChannel', 'class', 'style', 'children'])
  const picker = useColorPicker()
  let root!: HTMLDivElement
  const update = (e: PointerEvent) => {
    const r = root.getBoundingClientRect(),
      x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
      y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)),
      xc = getColorChannelConfig(local.xChannel),
      yc = getColorChannelConfig(local.yChannel)
    picker.controller.setAreaChannels(
      local.xChannel,
      positionToValue(x, xc.min, xc.max),
      local.yChannel,
      positionToValue(y, yc.min, yc.max, true),
    )
  }
  const color = () => picker.snapshot().value?.toString('oklch') ?? 'transparent'
  return (
    <AreaContext.Provider value={{ x: () => local.xChannel, y: () => local.yChannel }}>
      <div
        {...rest}
        ref={root}
        data-disabled={picker.snapshot().disabled || undefined}
        class={cn(colorPickerAreaClassName, local.class)}
        style={{
          '--color-picker-area-background':
            'linear-gradient(to top,black,transparent),linear-gradient(to right,white,transparent),' +
            color(),
          ...(local.style as JSX.CSSProperties),
        }}
        onPointerDown={(e) => {
          if (picker.snapshot().disabled) return
          e.currentTarget.setPointerCapture(e.pointerId)
          picker.controller.beginInteraction({ source: 'area' })
          update(e)
        }}
        onPointerMove={(e) => e.currentTarget.hasPointerCapture(e.pointerId) && update(e)}
        onPointerUp={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId)
            picker.controller.completeInteraction()
          }
        }}
      >
        {local.children}
      </div>
    </AreaContext.Provider>
  )
}
