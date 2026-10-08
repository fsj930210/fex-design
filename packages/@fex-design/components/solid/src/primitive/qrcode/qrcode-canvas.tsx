import {
  getQrCodeCenterExcludeRect,
  getQrCodeModuleCells,
  type QrCodeModuleExcludeRect,
} from '@fex-design/core/qrcode'
import { qrcodeSurfaceClassName } from '@fex-design/components-styles/qrcode'
import { cn } from '@fex-design/utils'
import { createEffect, splitProps, type JSX } from 'solid-js'
import { useQrCode } from './qrcode-context'

export interface QrCodeCanvasProps extends JSX.CanvasHTMLAttributes<HTMLCanvasElement> {
  centerSize?: number
  exclude?: QrCodeModuleExcludeRect
}

export function QrCodeCanvas(props: QrCodeCanvasProps) {
  const [local, rest] = splitProps(props, ['centerSize', 'exclude', 'class', 'style'])
  const { model } = useQrCode('QrCodeCanvas')
  let canvasRef: HTMLCanvasElement | undefined

  createEffect(() => {
    const canvas = canvasRef
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const current = model()
    const ratio = window.devicePixelRatio || 1
    const centerExclude = local.centerSize
      ? getQrCodeCenterExcludeRect(current, local.centerSize)
      : undefined
    const cells = getQrCodeModuleCells(current, local.exclude ?? centerExclude)
    const moduleSize = current.size / current.viewBoxSize

    canvas.width = current.size * ratio
    canvas.height = current.size * ratio
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    context.fillStyle = current.bgColor
    context.fillRect(0, 0, current.size, current.size)
    context.fillStyle = current.color
    for (const cell of cells) {
      context.fillRect(cell.x * moduleSize, cell.y * moduleSize, moduleSize, moduleSize)
    }
  })

  return (
    <canvas
      {...rest}
      ref={canvasRef}
      data-slot="qrcode-canvas"
      class={cn(qrcodeSurfaceClassName, local.class)}
      style={{
        width: model().size + 'px',
        height: model().size + 'px',
        ...(typeof local.style === 'object' ? local.style : {}),
      }}
    />
  )
}
