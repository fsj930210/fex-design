import { getQrCodeCenterRect } from '@fex-design/core/qrcode'
import { qrcodeCenterClassName } from '@fex-design/components-styles/qrcode'
import { cn } from '@fex-design/utils'
import type { Ref, SVGAttributes } from 'react'
import { useQrCode } from './qrcode-context'

export interface QrCodeCenterProps extends SVGAttributes<SVGSVGElement> {
  size?: number
  ref?: Ref<SVGSVGElement>
}

export function QrCodeCenter({
  size = 40,
  className,
  style,
  children,
  ref,
  ...props
}: QrCodeCenterProps) {
  const { model } = useQrCode('QrCodeCenter')
  const rect = getQrCodeCenterRect(model, size)

  return (
    <svg
      {...props}
      ref={ref}
      data-slot="qrcode-center"
      className={cn(qrcodeCenterClassName, className)}
      style={style}
      x={rect.x}
      y={rect.y}
      width={rect.width}
      height={rect.height}
      viewBox="0 0 100 100"
      overflow="visible"
    >
      {children}
    </svg>
  )
}
