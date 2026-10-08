import { tabsCloseClassName, tabsItemClassName } from "@fex-design/components-styles/tabs"
import { cn } from "@fex-design/utils"
import { mergeProps, onCleanup, splitProps, type JSX } from "solid-js"
import { XIcon } from "@fex-design/solid/icons/x"
import type { createTabs, TabsItemDOMProps } from "./create-tabs"
import { useTabsContext } from "./tabs-context"

type RenderChild<T> = (context: T) => JSX.Element

function isRenderChild<T>(
  child: JSX.Element | RenderChild<T> | undefined,
): child is RenderChild<T> {
  return typeof child === "function" && child.length > 0
}

export interface TabsItemProps extends Omit<JSX.HTMLAttributes<any>, "children"> {
  value: string
  disabled?: boolean
  closable?: boolean
  children?:
    | JSX.Element
    | RenderChild<{
        props: TabsItemDOMProps
        state: ReturnType<ReturnType<typeof createTabs>["itemState"]>
        closeProps: JSX.ButtonHTMLAttributes<HTMLButtonElement>
      }>
}

export function TabsItem(props: TabsItemProps) {
  const tabs = useTabsContext("TabsItem")
  const [local, rest] = splitProps(props, ["value", "disabled", "closable", "children", "class"])
  const item = () => ({
    value: local.value,
    ...(local.disabled === undefined ? {} : { disabled: local.disabled }),
    ...(local.closable === undefined ? {} : { closable: local.closable }),
  })
  tabs.registerItem(item())
  onCleanup(() => tabs.registerItem(item(), null))
  const renderProps = (): TabsItemDOMProps =>
    mergeProps(rest, tabs.getItemProps(item()), {
      get class() {
        return cn(tabsItemClassName({ variant: tabs.variant() }), local.class)
      },
    })
  const closeProps = () => ({ ...tabs.getCloseProps(item()), class: tabsCloseClassName })
  return isRenderChild(local.children) ? (
    local.children({
      props: renderProps(),
      state: tabs.itemState(item()),
      closeProps: closeProps(),
    })
  ) : (
    <div {...renderProps()}>
      {local.children}
      {local.closable && (
        <button {...closeProps()}>
          <XIcon class="size-4" />
        </button>
      )}
    </div>
  )
}
