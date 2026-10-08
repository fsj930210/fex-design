import type { ContextMenuController } from "@fex-design/core/overlay/context-menu/types"
import { onCleanup, type JSX } from "solid-js"
import { useContextMenuContext } from "./context-menu-context"

function eventInfo(event: Event & Partial<PointerEvent>) {
  return {
    target: event.target,
    currentTarget: event.currentTarget,
    clientX: event.clientX,
    clientY: event.clientY,
    button: event.button,
    pointerType: event.pointerType,
    event,
    preventDefault: event.preventDefault.bind(event),
    stopPropagation: event.stopPropagation.bind(event),
  }
}

export interface ContextMenuTriggerProps<T = unknown> {
  payload?: T
  children: (args: {
    ref: (element: HTMLElement) => void
    props: JSX.HTMLAttributes<HTMLElement>
    state: ReturnType<ContextMenuController<T>["getSnapshot"]>
  }) => JSX.Element
}

export function ContextMenuTrigger(props: ContextMenuTriggerProps<any>) {
  const context = useContextMenuContext<any>("ContextMenuTrigger")
  function ref(element: HTMLElement) {
    context.controller.overlay.setReferenceElement(element)
  }
  onCleanup(() => context.controller.overlay.setReferenceElement(null))
  return props.children({
    ref,
    state: context.snapshot(),
    props: {
      "aria-haspopup": "menu",
      ["data-state" as string]: context.snapshot().overlay.open ? "open" : "closed",
      onContextMenu: (event) => {
        const current = event.currentTarget as HTMLElement
        context.controller.openAt(
          {
            payload: props.payload,
            element: current,
            clientX: event.clientX,
            clientY: event.clientY,
            event,
          },
          eventInfo(event),
        )
      },
      onKeyDown: (event) => {
        if ((event.shiftKey && event.key === "F10") || event.key === "ContextMenu") {
          event.preventDefault()
          const current = event.currentTarget as HTMLElement
          const rect = current.getBoundingClientRect()
          context.controller.openAt(
            {
              payload: props.payload,
              element: current,
              clientX: rect.left,
              clientY: rect.bottom,
              event,
            },
            eventInfo(event),
          )
        }
      },
    },
  })
}
