import {
  collapseContentInnerClassName,
  collapseContentOuterClassName,
} from "@fex-design/components-styles/collapse"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX } from "solid-js"
import { useCollapseContext, useCollapseItemContext } from "./collapse-context"

export interface CollapseContentProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: JSX.Element | ((value: { expanded: boolean }) => JSX.Element)
}

export function CollapseContent(props: CollapseContentProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  const collapse = useCollapseContext()
  const item = useCollapseItemContext()
  const expanded = () => collapse.snapshot().expandedKeys.includes(item.value)
  return (
    <div
      data-slot="collapse-content-outer"
      data-state={expanded() ? "open" : "closed"}
      class={collapseContentOuterClassName}
    >
      <div
        {...rest}
        id={item.contentId}
        role="region"
        aria-labelledby={item.triggerId}
        aria-hidden={!expanded()}
        data-slot="collapse-content"
        data-state={expanded() ? "open" : "closed"}
        class={cn(collapseContentInnerClassName({ variant: collapse.variant() }), local.class)}
      >
        {typeof local.children === "function"
          ? local.children({ expanded: expanded() })
          : local.children}
      </div>
    </div>
  )
}
