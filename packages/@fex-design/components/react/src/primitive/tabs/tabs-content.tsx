import { tabsContentClassName } from "@fex-design/components-styles/tabs"
import { cn } from "@fex-design/utils"
import type { HTMLAttributes, ReactElement, ReactNode } from "react"
import { useTabsContext } from "./tabs-context"
import type { TabsContentDOMProps } from "./use-tabs"

type RenderChild<T> = (context: T) => ReactElement | null

export interface TabsContentProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  value: string
  children?: ReactNode | RenderChild<{ props: TabsContentDOMProps; active: boolean }>
}

export function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const tabs = useTabsContext("TabsContent")
  if (!tabs.isContentMounted(value)) return null
  const contentProps = tabs.getContentProps(value)
  const renderProps = {
    ...props,
    ...contentProps,
    className: cn(tabsContentClassName({ variant: tabs.variant }), className),
  }
  if (typeof children === "function")
    return children({ props: renderProps, active: tabs.snapshot.value === value })
  return <div {...renderProps}>{children}</div>
}
