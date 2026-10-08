import {
  createQrCodeModel,
  type QrCodeModelOptions,
} from '@fex-design/core/qrcode'
import { qrcodeRootClassName } from '@fex-design/components-styles/qrcode'
import { cn } from '@fex-design/utils'
import {
  createMemo,
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { QrCodeContext } from './qrcode-context'

export type QrCodeRootProps = ParentProps<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'color'> & QrCodeModelOptions
>

export function QrCodeRoot(props: QrCodeRootProps) {
  const [local, rest] = splitProps(props, [
    'value',
    'errorLevel',
    'margin',
    'size',
    'color',
    'bgColor',
    'class',
    'style',
    'children',
  ])
  const model = createMemo(() =>
    createQrCodeModel({
      value: local.value,
      errorLevel: local.errorLevel,
      margin: local.margin,
      size: local.size,
      color: local.color,
      bgColor: local.bgColor,
    }),
  )

  return (
    <QrCodeContext.Provider value={{ model }}>
      <div
        {...rest}
        data-slot="qrcode"
        class={cn(qrcodeRootClassName, local.class)}
        style={{
          width: model().size + 'px',
          height: model().size + 'px',
          '--qrcode-size': model().size + 'px',
          '--qrcode-color': model().color,
          '--qrcode-bg-color': model().bgColor,
          ...(typeof local.style === 'object' ? local.style : {}),
        }}
      >
        {local.children}
      </div>
    </QrCodeContext.Provider>
  )
}
