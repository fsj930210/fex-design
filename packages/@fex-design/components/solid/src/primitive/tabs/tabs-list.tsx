import { tabsListClassName } from "@fex-design/components-styles/tabs"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX } from "solid-js"
import type { TabsListDOMProps } from "./create-tabs"
import { useTabsContext } from "./tabs-context"

type RenderChild<T> = (context: T) => JSX.Element

function isRenderChild<T>(
  child: JSX.Element | RenderChild<T> | undefined,
): child is RenderChild<T> {
  return typeof child === "function" && child.length > 0
}

export interface TabsListProps extends Omit<JSX.HTMLAttributes<any>, "children"> {
  children?: JSX.Element | RenderChild<{ props: TabsListDOMProps }>
}

export function TabsList(props: TabsListProps) {
  const tabs = useTabsContext("TabsList")
  const [local, rest] = splitProps(props, ["children", "class"])
  const renderProps = (): TabsListDOMProps => ({
    ...rest,
    ...tabs.getListProps(),
    class: cn(
      tabsListClassName({ variant: tabs.variant(), orientation: tabs.orientation() }),
      local.class,
    ),
  })
  return isRenderChild(local.children) ? (
    local.children({ props: renderProps() })
  ) : (
    <div {...renderProps()}>{local.children}</div>
  )
}
