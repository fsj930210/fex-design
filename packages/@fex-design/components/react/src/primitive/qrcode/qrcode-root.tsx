import {
  createQrCodeModel,
  type QrCodeModelOptions,
} from '@fex-design/core/qrcode'
import { qrcodeRootClassName } from '@fex-design/components-styles/qrcode'
import { cn } from '@fex-design/utils'
import {
  useMemo,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react'
import { QrCodeContext } from './qrcode-context'

export interface QrCodeRootProps
  extends Omit<ComponentProps<'div'>, 'children' | 'color' | 'defaultValue'>, QrCodeModelOptions {
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

export function QrCodeRoot({
  value,
  errorLevel,
  margin,
  size,
  color,
  bgColor,
  className,
  style,
  children,
  ref,
  ...props
}: QrCodeRootProps) {
  const model = useMemo(
    () => createQrCodeModel({ value, errorLevel, margin, size, color, bgColor }),
    [value, errorLevel, margin, size, color, bgColor],
  )
  const cssVars = {
    '--qrcode-size': model.size + 'px',
    '--qrcode-color': model.color,
    '--qrcode-bg-color': model.bgColor,
    ...style,
  } as CSSProperties

  return (
    <QrCodeContext value={{ model }}>
      <div
        {...props}
        ref={ref}
        data-slot="qrcode"
        className={cn(qrcodeRootClassName, className)}
        style={{ width: model.size, height: model.size, ...cssVars }}
      >
        {children}
      </div>
    </QrCodeContext>
  )
}
