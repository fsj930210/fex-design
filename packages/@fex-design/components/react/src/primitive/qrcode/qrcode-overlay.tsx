import { qrcodeOverlayClassName } from '@fex-design/components-styles/qrcode'
import { cn } from '@fex-design/utils'
import type { ComponentProps, Ref } from 'react'

export interface QrCodeOverlayProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement>
}

export function QrCodeOverlay({ className, ref, ...props }: QrCodeOverlayProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="qrcode-overlay"
      className={cn(qrcodeOverlayClassName, className)}
    />
  )
}
