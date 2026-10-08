import type { ParentProps } from "solid-js"
import { createTabs, type CreateTabsOptions } from "./create-tabs"
import { TabsContext } from "./tabs-context"

export interface TabsRootProps extends ParentProps<CreateTabsOptions> {
  variant?: "default" | "line"
}
export type TabsProps = TabsRootProps

export function TabsRoot(props: TabsRootProps) {
  const tabs = createTabs(props)
  return (
    <TabsContext.Provider value={{ ...tabs, variant: () => props.variant ?? "default" }}>
      {props.children}
    </TabsContext.Provider>
  )
}

export { TabsRoot as Tabs }
