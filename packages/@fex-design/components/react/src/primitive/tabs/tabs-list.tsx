import { tabsListClassName } from "@fex-design/components-styles/tabs"
import { cn } from "@fex-design/utils"
import type { HTMLAttributes, ReactElement, ReactNode, Ref } from "react"
import { useComposedRef } from "@fex-design/react/hooks/use-composed-ref"
import { useTabsContext } from "./tabs-context"
import type { TabsListDOMProps } from "./use-tabs"

type RenderChild<T> = (context: T) => ReactElement | null

export interface TabsListProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  ref?: Ref<HTMLElement>
  children?:
    | ReactNode
    | RenderChild<{ props: TabsListDOMProps & { ref: (element: HTMLElement | null) => void } }>
}

export function TabsList({ className, children, ref, ...props }: TabsListProps) {
  const tabs = useTabsContext("TabsList")
  const listProps = tabs.getListProps()
  const composedRef = useComposedRef<HTMLElement>(ref)
  const renderProps = {
    ...props,
    ...listProps,
    ref: composedRef,
    className: cn(
      tabsListClassName({ variant: tabs.variant, orientation: tabs.orientation }),
      className,
    ),
  }
  if (typeof children === "function") return children({ props: renderProps })
  return <div {...renderProps}>{children}</div>
}
