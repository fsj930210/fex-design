import { qrcodeSurfaceClassName } from '@fex-design/components-styles/qrcode'
import { cn } from '@fex-design/utils'
import type { Ref, SVGAttributes } from 'react'
import { useQrCode } from './qrcode-context'

export interface QrCodeSvgProps extends SVGAttributes<SVGSVGElement> {
  ref?: Ref<SVGSVGElement>
}

export function QrCodeSvg({ className, children, ref, ...props }: QrCodeSvgProps) {
  const { model } = useQrCode('QrCodeSvg')

  return (
    <svg
      {...props}
      ref={ref}
      role={props.role ?? 'img'}
      aria-label={props['aria-label'] ?? 'QR code'}
      data-slot="qrcode-svg"
      className={cn(qrcodeSurfaceClassName, className)}
      viewBox={'0 0 ' + model.viewBoxSize + ' ' + model.viewBoxSize}
      width={model.size}
      height={model.size}
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}
