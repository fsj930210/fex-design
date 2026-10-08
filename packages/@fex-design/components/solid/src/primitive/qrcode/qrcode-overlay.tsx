import { qrcodeOverlayClassName } from '@fex-design/components-styles/qrcode'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'

export type QrCodeOverlayProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function QrCodeOverlay(props: QrCodeOverlayProps) {
  const [local, rest] = splitProps(props, ['class', 'children'])

  return (
    <div {...rest} data-slot="qrcode-overlay" class={cn(qrcodeOverlayClassName, local.class)}>
      {local.children}
    </div>
  )
}
