import {
  getQrCodeCenterExcludeRect,
  getQrCodeSvgPath,
  type QrCodeModuleExcludeRect,
} from '@fex-design/core/qrcode'
import { qrcodeModulesClassName } from '@fex-design/components-styles/qrcode'
import { cn } from '@fex-design/utils'
import { createMemo, splitProps, type JSX } from 'solid-js'
import { useQrCode } from './qrcode-context'

export interface QrCodeModulesProps extends JSX.SvgSVGAttributes<SVGPathElement> {
  centerSize?: number
  exclude?: QrCodeModuleExcludeRect
}

export function QrCodeModules(props: QrCodeModulesProps) {
  const [local, rest] = splitProps(props, ['centerSize', 'exclude', 'class'])
  const { model } = useQrCode('QrCodeModules')
  const path = createMemo(() => {
    const centerExclude = local.centerSize
      ? getQrCodeCenterExcludeRect(model(), local.centerSize)
      : undefined
    return getQrCodeSvgPath(model(), local.exclude ?? centerExclude)
  })

  return (
    <path
      {...rest}
      data-slot="qrcode-modules"
      class={cn(qrcodeModulesClassName, local.class)}
      d={path()}
    />
  )
}
