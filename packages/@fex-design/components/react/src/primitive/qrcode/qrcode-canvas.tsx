import {
  getQrCodeCenterExcludeRect,
  getQrCodeModuleCells,
  type QrCodeModuleExcludeRect,
} from '@fex-design/core/qrcode'
import { qrcodeSurfaceClassName } from '@fex-design/components-styles/qrcode'
import { cn } from '@fex-design/utils'
import {
  useEffect,
  useRef,
  type CanvasHTMLAttributes,
  type Ref,
} from 'react'
import { useQrCode } from './qrcode-context'

export interface QrCodeCanvasProps extends CanvasHTMLAttributes<HTMLCanvasElement> {
  centerSize?: number
  exclude?: QrCodeModuleExcludeRect
  ref?: Ref<HTMLCanvasElement>
}

export function QrCodeCanvas({ centerSize, exclude, className, ref, ...props }: QrCodeCanvasProps) {
  const { model } = useQrCode('QrCodeCanvas')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const ratio = window.devicePixelRatio || 1
    const centerExclude = centerSize ? getQrCodeCenterExcludeRect(model, centerSize) : undefined
    const cells = getQrCodeModuleCells(model, exclude ?? centerExclude)
    const moduleSize = model.size / model.viewBoxSize

    canvas.width = model.size * ratio
    canvas.height = model.size * ratio
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    context.fillStyle = model.bgColor
    context.fillRect(0, 0, model.size, model.size)
    context.fillStyle = model.color
    for (const cell of cells) {
      context.fillRect(cell.x * moduleSize, cell.y * moduleSize, moduleSize, moduleSize)
    }
  }, [model, centerSize, exclude])

  return (
    <canvas
      {...props}
      ref={(node) => {
        canvasRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as { current: HTMLCanvasElement | null }).current = node
      }}
      data-slot="qrcode-canvas"
      className={cn(qrcodeSurfaceClassName, className)}
      style={{ width: model.size, height: model.size, ...props.style }}
    />
  )
}
