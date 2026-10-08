import { createFloating } from '@fex-design/core/floating/create-floating'
import { tourContentClassName } from '@fex-design/components-styles/tour'
import { cn } from '@fex-design/utils'
import { createEffect, createMemo, onCleanup, Show, type JSX, type ParentProps } from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { TourContentContext, useTourContext } from './tour-context'

export interface TourContentProps extends ParentProps {
  class?: string
  style?: JSX.CSSProperties
}

export function TourContent(props: TourContentProps) {
  const { controller, snapshot, defaultGap, zIndex } = useTourContext('TourContent')
  const floating = createFloating({ placement: 'bottom', arrow: true, offset: 12 })
  const floatingSnapshot = createCoreStoreSignal(floating)
  let content: HTMLDivElement | null = null
  const step = createMemo(() => snapshot().currentStep)
  const target = createMemo(() => (step()?.target ? controller.getTarget(step()!.target!) : null))
  const gap = createMemo(() => step()?.gap?.offset ?? defaultGap)
  createEffect(() => {
    const offset = (Array.isArray(gap()) ? Math.max(...(gap() as [number, number])) : gap()) + 12
    floating.setOptions({
      placement: step()?.placement ?? 'bottom',
      arrow: step()?.arrow !== false,
      offset,
    })
    floating.setReferenceElement(target())
    if (snapshot().open && target()) floating.startAutoUpdate()
    else floating.stopAutoUpdate()
  })
  onCleanup(() => {
    floating.setFloatingElement(null)
    floating.destroy()
  })
  const setContent = (value: HTMLDivElement) => {
    content = value
    queueMicrotask(() => {
      if (content?.isConnected) floating.setFloatingElement(content)
    })
  }
  return (
    <Show when={snapshot().open && step()}>
      <TourContentContext.Provider value={{ floating, snapshot: floatingSnapshot }}>
        <div
          ref={setContent}
          role="dialog"
          tabIndex={-1}
          data-slot="tour-content"
          data-side={floatingSnapshot().side}
          data-placement={floatingSnapshot().placement}
          class={cn(tourContentClassName, props.class)}
          style={{
            position: 'var(--floating-strategy, absolute)',
            left: 'var(--floating-x, 0px)',
            top: 'var(--floating-y, 0px)',
            'transform-origin': 'var(--floating-transform-origin)',
            'z-index': zIndex,
            ...props.style,
          }}
        >
          {props.children}
        </div>
      </TourContentContext.Provider>
    </Show>
  )
}
