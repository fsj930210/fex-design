import { tabsCloseClassName, tabsItemClassName } from "@fex-design/components-styles/tabs"
import { cn } from "@fex-design/utils"
import type { HTMLAttributes, KeyboardEvent, MouseEvent, ReactElement, ReactNode, Ref } from "react"
import { useComposedRef } from "@fex-design/react/hooks/use-composed-ref"
import { XIcon } from "@fex-design/react/icons/x"
import { useTabsContext } from "./tabs-context"
import type { TabsItemData, TabsItemDOMProps, TabsItemState, useTabs } from "./use-tabs"

type RenderChild<T> = (context: T) => ReactElement | null

export interface TabsItemProps extends Omit<HTMLAttributes<HTMLElement>, "children">, TabsItemData {
  ref?: Ref<HTMLElement>
  children?:
    | ReactNode
    | RenderChild<{
        props: TabsItemDOMProps
        state: TabsItemState
        closeProps: ReturnType<ReturnType<typeof useTabs>["getCloseProps"]>
      }>
}

export function TabsItem({
  value,
  disabled,
  closable,
  label,
  className,
  children,
  onClick,
  onKeyDown,
  ref,
  ...props
}: TabsItemProps) {
  const tabs = useTabsContext("TabsItem")
  const item: TabsItemData = {
    value,
    ...(disabled === undefined ? {} : { disabled }),
    ...(closable === undefined ? {} : { closable }),
    ...(label === undefined ? {} : { label }),
  }
  const itemProps = tabs.getItemProps(item)
  const composedRef = useComposedRef<HTMLElement>(itemProps.ref, ref)
  const state = tabs.getItemState(item)
  const closeProps = tabs.getCloseProps(item)
  const mergedProps = {
    ...props,
    ...itemProps,
    ref: composedRef,
    className: cn(tabsItemClassName({ variant: tabs.variant }), className),
    onClick: (event: MouseEvent<HTMLElement>) => {
      onClick?.(event)
      if (!event.defaultPrevented) itemProps.onClick?.(event)
    },
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      onKeyDown?.(event)
      if (!event.defaultPrevented) itemProps.onKeyDown?.(event)
    },
  }
  if (typeof children === "function") return children({ props: mergedProps, state, closeProps })
  return (
    <div {...mergedProps}>
      {children ?? label}
      {state.closable ? (
        <button {...closeProps} className={tabsCloseClassName}>
          <XIcon className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
