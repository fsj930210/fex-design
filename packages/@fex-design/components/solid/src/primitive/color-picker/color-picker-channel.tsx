import { getColorChannelConfig } from '@fex-design/core/color-picker/channels'
import { positionToValue } from '@fex-design/core/color-picker/coordinates'
import type { ColorChannel } from '@fex-design/core/color-picker/types'
import { colorPickerChannelClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { ChannelContext, useColorPicker } from './color-picker-context'

export type ColorPickerChannelProps = ParentProps<
  JSX.HTMLAttributes<HTMLDivElement> & {
    channel: ColorChannel
    orientation?: 'horizontal' | 'vertical'
  }
>

export function ColorPickerChannel(props: ColorPickerChannelProps) {
  const [local, rest] = splitProps(props, ['channel', 'orientation', 'class', 'style', 'children'])
  const picker = useColorPicker()
  let root!: HTMLDivElement
  const orientation = () => local.orientation ?? 'horizontal',
    update = (e: PointerEvent) => {
      const r = root.getBoundingClientRect(),
        p =
          orientation() === 'vertical'
            ? 1 - (e.clientY - r.top) / r.height
            : (e.clientX - r.left) / r.width,
        c = getColorChannelConfig(local.channel)
      picker.controller.setChannel(
        local.channel,
        positionToValue(Math.min(1, Math.max(0, p)), c.min, c.max),
      )
    }
  const bg = () =>
    local.channel.endsWith('hue')
      ? 'linear-gradient(to right,red,#ff0,lime,cyan,blue,#f0f,red)'
      : local.channel === 'alpha'
        ? 'linear-gradient(to right,transparent,' +
          (picker.snapshot().value?.toString('rgb') ?? 'transparent') +
          ')'
        : picker.snapshot().value?.toString('rgb')
  return (
    <ChannelContext.Provider value={() => local.channel}>
      <div
        {...rest}
        ref={root}
        data-disabled={picker.snapshot().disabled || undefined}
        data-orientation={orientation()}
        class={cn(colorPickerChannelClassName, local.class)}
        style={{ '--color-picker-channel-background': bg(), ...(local.style as JSX.CSSProperties) }}
        onPointerDown={(e) => {
          if (picker.snapshot().disabled) return
          e.currentTarget.setPointerCapture(e.pointerId)
          picker.controller.beginInteraction({ source: 'channel' })
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
    </ChannelContext.Provider>
  )
}
