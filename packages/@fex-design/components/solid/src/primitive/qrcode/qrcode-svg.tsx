import { qrcodeSurfaceClassName } from '@fex-design/components-styles/qrcode'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { useQrCode } from './qrcode-context'

export type QrCodeSvgProps = ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>>

export function QrCodeSvg(props: QrCodeSvgProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'role', 'aria-label'])
  const { model } = useQrCode('QrCodeSvg')

  return (
    <svg
      {...rest}
      role={local.role ?? 'img'}
      aria-label={local['aria-label'] ?? 'QR code'}
      data-slot="qrcode-svg"
      class={cn(qrcodeSurfaceClassName, local.class)}
      viewBox={'0 0 ' + model().viewBoxSize + ' ' + model().viewBoxSize}
      width={model().size}
      height={model().size}
      shape-rendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      {local.children}
    </svg>
  )
}
