import type { TabsStyleProps } from "@fex-design/components-styles/tabs"
import type { ReactNode } from "react"
import { TabsContext } from "./tabs-context"
import { useTabs, type UseTabsOptions } from "./use-tabs"

export interface TabsRootProps extends UseTabsOptions {
  children: ReactNode
  variant?: NonNullable<TabsStyleProps["variant"]>
}
export type TabsProps = TabsRootProps

export function TabsRoot({ children, variant = "default", ...options }: TabsRootProps) {
  const tabs = useTabs(options)
  return <TabsContext value={{ ...tabs, variant }}>{children}</TabsContext>
}

export { TabsRoot as Tabs }
