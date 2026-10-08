import { qrcodeBackgroundClassName } from '@fex-design/components-styles/qrcode'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'
import { useQrCode } from './qrcode-context'

export type QrCodeBackgroundProps = JSX.SvgSVGAttributes<SVGRectElement>

export function QrCodeBackground(props: QrCodeBackgroundProps) {
  const [local, rest] = splitProps(props, ['class'])
  const { model } = useQrCode('QrCodeBackground')

  return (
    <rect
      {...rest}
      data-slot="qrcode-background"
      class={cn(qrcodeBackgroundClassName, local.class)}
      width={model().viewBoxSize}
      height={model().viewBoxSize}
    />
  )
}
