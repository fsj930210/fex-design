import {
  getQrCodeCenterExcludeRect,
  getQrCodeSvgPath,
  type QrCodeModuleExcludeRect,
} from '@fex-design/core/qrcode'
import { qrcodeModulesClassName } from '@fex-design/components-styles/qrcode'
import { cn } from '@fex-design/utils'
import type { Ref, SVGAttributes } from 'react'
import { useQrCode } from './qrcode-context'

export interface QrCodeModulesProps extends SVGAttributes<SVGPathElement> {
  centerSize?: number
  exclude?: QrCodeModuleExcludeRect
  ref?: Ref<SVGPathElement>
}

export function QrCodeModules({
  centerSize,
  exclude,
  className,
  ref,
  ...props
}: QrCodeModulesProps) {
  const { model } = useQrCode('QrCodeModules')
  const centerExclude = centerSize ? getQrCodeCenterExcludeRect(model, centerSize) : undefined
  const path = getQrCodeSvgPath(model, exclude ?? centerExclude)

  return (
    <path
      {...props}
      ref={ref}
      data-slot="qrcode-modules"
      className={cn(qrcodeModulesClassName, className)}
      d={path}
    />
  )
}
