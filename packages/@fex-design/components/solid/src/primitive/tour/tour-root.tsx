import { createTourController } from '@fex-design/core/tour/create-tour-controller'
import type { TourOptions } from '@fex-design/core/tour/types'
import {
  createEffect,
  onCleanup,
  onMount,
  type ParentProps,
} from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { TourContext } from './tour-context'

export interface TourRootProps<TData = unknown> extends ParentProps, TourOptions<TData> {
  keyboard?: boolean
  overlay?: boolean
  closeOnOverlayClick?: boolean
  defaultGap?: number
  zIndex?: number
  getPopupContainer?: (referenceElement: HTMLElement | null) => HTMLElement
}

export function TourRoot<TData = unknown>(props: TourRootProps<TData>) {
  const controller = createTourController<TData>(props)
  const snapshot = createCoreStoreSignal(controller)
  const update = () =>
    controller.setOptions({
      open: props.open,
      defaultOpen: props.defaultOpen,
      current: props.current,
      defaultCurrent: props.defaultCurrent,
      targetMissing: props.targetMissing,
      targetTimeout: props.targetTimeout,
      onOpenChange: props.onOpenChange,
      onChange: props.onChange,
      onClose: props.onClose,
      onFinish: props.onFinish,
      onTargetMissing: props.onTargetMissing,
    })
  createEffect(update)
  const refresh = () => controller.refreshTarget()
  onMount(() => {
    window.addEventListener('resize', refresh)
    window.addEventListener('scroll', refresh, true)
  })
  onCleanup(() => {
    window.removeEventListener('resize', refresh)
    window.removeEventListener('scroll', refresh, true)
    controller.destroy()
  })
  function keydown(event: KeyboardEvent) {
    if (!snapshot().open || props.keyboard === false) return
    if (event.key === 'Escape') {
      event.preventDefault()
      controller.close()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      void controller.next()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      void controller.previous()
    }
  }
  onMount(() => {
    document.addEventListener('keydown', keydown)
    onCleanup(() => document.removeEventListener('keydown', keydown))
  })
  return (
    <TourContext.Provider
      value={{
        controller,
        snapshot,
        overlay: props.overlay ?? true,
        closeOnOverlayClick: props.closeOnOverlayClick ?? true,
        defaultGap: props.defaultGap ?? 6,
        zIndex: props.zIndex ?? 1001,
        getPopupContainer: props.getPopupContainer,
      }}
    >
      {props.children}
    </TourContext.Provider>
  )
}
