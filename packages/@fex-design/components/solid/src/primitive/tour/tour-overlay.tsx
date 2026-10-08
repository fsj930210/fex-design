
import { tourOverlayClassName } from '@fex-design/components-styles/tour'
import { cn } from '@fex-design/utils'
import { createMemo, Show, type JSX } from 'solid-js'
import { useTourContext } from './tour-context'

export interface TourOverlayRenderProps {
  props: JSX.HTMLAttributes<HTMLDivElement>
  targetRect: DOMRect | null
  gap: number | [number, number]
  color: string
}

export interface TourOverlayProps {
  class?: string
  style?: JSX.CSSProperties
  children?: (value: TourOverlayRenderProps) => JSX.Element
}

export function TourOverlay(props: TourOverlayProps) {
  const { controller, snapshot, overlay, closeOnOverlayClick, zIndex } =
    useTourContext('TourOverlay')
  const step = () => snapshot().currentStep
  const mask = () => (typeof step()?.mask === 'object' ? step()?.mask : undefined)
  const color = () => mask()?.color ?? 'rgba(0, 0, 0, 0.45)'
  const gap = () => mask()?.gap ?? 0
  const rect = createMemo(() => {
    const target = snapshot().targetRect
    if (!target) return null
    const x = Array.isArray(gap()) ? gap()[0] : gap()
    const y = Array.isArray(gap()) ? gap()[1] : gap()
    return {
      x: target.x - x,
      y: target.y - y,
      width: target.width + x * 2,
      height: target.height + y * 2,
    }
  })
  const click = (event: MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) controller.close()
  }
  return (
    <Show when={snapshot().open && step()?.mask !== false && overlay}>
      {props.children ? (
        props.children({
          props: {
            class: cn(tourOverlayClassName, props.class),
            style: {
              'pointer-events': step()?.disabledInteraction ? 'auto' : 'none',
              'z-index': zIndex - 1,
              ...props.style,
            },
            onClick: click,
          },
          targetRect: snapshot().targetRect,
          gap: gap(),
          color: color(),
        })
      ) : (
        <div
          class={cn(tourOverlayClassName, props.class)}
          style={{
            'pointer-events': step()?.disabledInteraction ? 'auto' : 'none',
            'z-index': zIndex - 1,
            ...props.style,
          }}
          onClick={click}
        >
          <svg
            aria-hidden="true"
            class="size-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <mask id="tour-mask">
              <rect width="100" height="100" fill="white" />
              {rect() && (
                <rect
                  x={`${(rect()!.x / innerWidth) * 100}%`}
                  y={`${(rect()!.y / innerHeight) * 100}%`}
                  width={`${(rect()!.width / innerWidth) * 100}%`}
                  height={`${(rect()!.height / innerHeight) * 100}%`}
                  fill="black"
                />
              )}
            </mask>
            <rect width="100" height="100" fill={color()} mask="url(#tour-mask)" />
          </svg>
        </div>
      )}
    </Show>
  )
}
