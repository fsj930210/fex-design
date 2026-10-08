import { qrcodeBackgroundClassName } from '@fex-design/components-styles/qrcode'
import { cn } from '@fex-design/utils'
import type { Ref, SVGAttributes } from 'react'
import { useQrCode } from './qrcode-context'

export interface QrCodeBackgroundProps extends SVGAttributes<SVGRectElement> {
  ref?: Ref<SVGRectElement>
}

export function QrCodeBackground({ className, ref, ...props }: QrCodeBackgroundProps) {
  const { model } = useQrCode('QrCodeBackground')

  return (
    <rect
      {...props}
      ref={ref}
      data-slot="qrcode-background"
      className={cn(qrcodeBackgroundClassName, className)}
      width={model.viewBoxSize}
      height={model.viewBoxSize}
    />
  )
}
