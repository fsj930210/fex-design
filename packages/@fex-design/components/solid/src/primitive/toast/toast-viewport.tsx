import {
  toastStackContainerClassName,
  toastStackItemsClassName,
  toastStackLayerClassName,
  toastViewportClassName,
  type ToastPlacement,
} from "@fex-design/components-styles/toast"
import { cn } from "@fex-design/utils"
import { For, Show, type JSX } from "solid-js"
import { Portal } from "solid-js/web"
import { createToasts } from "@fex-design/solid/primitives/create-toasts"
import { toast, type SolidToastItem, type SolidToastManager } from "./toast-manager"

const toastPlacements: ToastPlacement[] = [
  "top-left",
  "top",
  "top-right",
  "bottom-left",
  "bottom",
  "bottom-right",
]

function styleObject(style: JSX.CSSProperties | string | undefined) {
  return typeof style === "object" ? style : {}
}

export interface ToastViewportProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "children"> {
  children: (items: SolidToastItem[]) => JSX.Element
  manager?: SolidToastManager
  offset?: number | string
  placement?: ToastPlacement
  portal?: boolean
  stack?: boolean
  stackThreshold?: number
}

export function ToastViewport(props: ToastViewportProps) {
  const manager = () => props.manager ?? toast
  const { items: toastItems } = createToasts(manager())

  const content = () => (
    <For each={props.placement ? [props.placement] : toastPlacements}>
      {(placement) => {
        const items = () => toastItems().filter((item) => item.placement === placement)
        const stacked = () => props.stack === true && items().length > (props.stackThreshold ?? 3)
        const renderedItems = () => (stacked() ? items().slice(-1) : items())
        return (
          <Show when={items().length > 0}>
            <div
              data-slot="toast-viewport"
              class={cn(toastViewportClassName({ placement }), props.class)}
              style={{
                "--toast-offset":
                  typeof props.offset === "number" ? `${props.offset}px` : (props.offset ?? "24px"),
                ...styleObject(props.style),
              }}
            >
              <div class={toastStackContainerClassName({ placement })}>
                <Show when={stacked()}>
                  <div
                    aria-hidden="true"
                    class={cn(toastStackLayerClassName, "top-2 opacity-70")}
                  />
                  <div
                    aria-hidden="true"
                    class={cn(toastStackLayerClassName, "top-4 w-[calc(100%-32px)] opacity-40")}
                  />
                </Show>
                <div class={toastStackItemsClassName({ placement })}>
                  {props.children(renderedItems())}
                </div>
              </div>
            </div>
          </Show>
        )
      }}
    </For>
  )

  return props.portal === false ? content() : <Portal>{content()}</Portal>
}
