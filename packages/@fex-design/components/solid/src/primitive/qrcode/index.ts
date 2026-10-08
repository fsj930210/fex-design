import { QrCodeRoot } from './qrcode-root'
import { QrCodeSvg } from './qrcode-svg'
import { QrCodeCanvas } from './qrcode-canvas'
import { QrCodeBackground } from './qrcode-background'
import { QrCodeModules } from './qrcode-modules'
import { QrCodeCenter } from './qrcode-center'
import { QrCodeOverlay } from './qrcode-overlay'

export { QrCodeRoot, type QrCodeRootProps } from './qrcode-root'
export { QrCodeSvg, type QrCodeSvgProps } from './qrcode-svg'
export { QrCodeCanvas, type QrCodeCanvasProps } from './qrcode-canvas'
export { QrCodeBackground, type QrCodeBackgroundProps } from './qrcode-background'
export { QrCodeModules, type QrCodeModulesProps } from './qrcode-modules'
export { QrCodeCenter, type QrCodeCenterProps } from './qrcode-center'
export { QrCodeOverlay, type QrCodeOverlayProps } from './qrcode-overlay'
export { QrCodeContext, useQrCode, type QrCodeContextValue } from './qrcode-context'

export const QrCode = {
  Root: QrCodeRoot,
  Svg: QrCodeSvg,
  Canvas: QrCodeCanvas,
  Background: QrCodeBackground,
  Modules: QrCodeModules,
  Center: QrCodeCenter,
  Overlay: QrCodeOverlay,
}

export type { QrCodeErrorLevel, QrCodeModel, QrCodeModuleExcludeRect } from '@fex-design/core/qrcode'
