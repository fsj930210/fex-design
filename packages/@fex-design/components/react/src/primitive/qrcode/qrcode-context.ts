import type { QrCodeModel } from '@fex-design/core/qrcode'
import { createContext, use } from 'react'

export interface QrCodeContextValue {
  model: QrCodeModel
}

export const QrCodeContext = createContext<QrCodeContextValue | null>(null)

export function useQrCode(component = 'useQrCode') {
  const context = use(QrCodeContext)
  if (!context) {
    throw new Error(component + ' must be used inside QrCodeRoot.')
  }
  return context
}
