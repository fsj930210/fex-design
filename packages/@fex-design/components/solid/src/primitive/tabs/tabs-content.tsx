import { tabsContentClassName } from "@fex-design/components-styles/tabs"
import { cn } from "@fex-design/utils"
import { Show, splitProps, type JSX } from "solid-js"
import type { TabsContentDOMProps } from "./create-tabs"
import { useTabsContext } from "./tabs-context"

type RenderChild<T> = (context: T) => JSX.Element

function isRenderChild<T>(
  child: JSX.Element | RenderChild<T> | undefined,
): child is RenderChild<T> {
  return typeof child === "function" && child.length > 0
}

export interface TabsContentProps extends Omit<JSX.HTMLAttributes<any>, "children"> {
  value: string
  children?: JSX.Element | RenderChild<{ props: TabsContentDOMProps; state: { active: boolean } }>
}

export function TabsContent(props: TabsContentProps) {
  const tabs = useTabsContext("TabsContent")
  const [local, rest] = splitProps(props, ["value", "children", "class"])
  const renderProps = (): TabsContentDOMProps => ({
    ...rest,
    ...tabs.getContentProps(local.value),
    class: cn(tabsContentClassName({ variant: tabs.variant() }), local.class),
  })
  const isMounted = () => {
    tabs.snapshot()
    return tabs.isContentMounted(local.value)
  }
  return (
    <Show when={isMounted()}>
      {isRenderChild(local.children) ? (
        local.children({
          props: renderProps(),
          state: { active: tabs.snapshot().value === local.value },
        })
      ) : (
        <div {...renderProps()}>{local.children}</div>
      )}
    </Show>
  )
}
