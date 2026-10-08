import type { QrCodeModel } from '@fex-design/core/qrcode'
import { createContext, useContext, type Accessor } from 'solid-js'

export interface QrCodeContextValue {
  model: Accessor<QrCodeModel>
}

export const QrCodeContext = createContext<QrCodeContextValue>()

export function useQrCode(component = 'useQrCode') {
  const context = useContext(QrCodeContext)
  if (!context) {
    throw new Error(component + ' must be used inside QrCodeRoot.')
  }
  return context
}
