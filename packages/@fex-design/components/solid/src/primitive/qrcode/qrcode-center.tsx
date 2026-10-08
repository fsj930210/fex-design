import { getQrCodeCenterRect } from '@fex-design/core/qrcode'
import { qrcodeCenterClassName } from '@fex-design/components-styles/qrcode'
import { cn } from '@fex-design/utils'
import { createMemo, splitProps, type JSX, type ParentProps } from 'solid-js'
import { useQrCode } from './qrcode-context'

export type QrCodeCenterProps = ParentProps<JSX.SvgSVGAttributes<SVGSVGElement> & { size?: number }>

export function QrCodeCenter(props: QrCodeCenterProps) {
  const [local, rest] = splitProps(props, ['size', 'class', 'style', 'children'])
  const size = () => local.size ?? 40
  const { model } = useQrCode('QrCodeCenter')
  const rect = createMemo(() => getQrCodeCenterRect(model(), size()))

  return (
    <svg
      {...rest}
      data-slot="qrcode-center"
      class={cn(qrcodeCenterClassName, local.class)}
      style={local.style}
      x={rect().x}
      y={rect().y}
      width={rect().width}
      height={rect().height}
      viewBox="0 0 100 100"
      overflow="visible"
    >
      {local.children}
    </svg>
  )
}
