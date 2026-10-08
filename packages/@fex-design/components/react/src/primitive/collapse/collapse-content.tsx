import {
  collapseContentInnerClassName,
  collapseContentOuterClassName,
} from "@fex-design/components-styles/collapse"
import { cn } from "@fex-design/utils"
import type { HTMLAttributes, ReactElement, ReactNode } from "react"
import { useCollapseContext, useCollapseItemContext } from "./collapse-context"

type RenderChild<T> = (context: T) => ReactElement | null

export interface CollapseContentProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children?: ReactNode | RenderChild<{ expanded: boolean }>
}

export function CollapseContent({ className, children, ...props }: CollapseContentProps) {
  const collapse = useCollapseContext("CollapseContent")
  const item = useCollapseItemContext("CollapseContent")
  const expanded = collapse.isExpanded(item.value)
  return (
    <div
      data-slot="collapse-content-outer"
      data-state={expanded ? "open" : "closed"}
      className={collapseContentOuterClassName}
    >
      <div
        {...props}
        id={item.contentId}
        role="region"
        aria-labelledby={item.triggerId}
        aria-hidden={!expanded}
        data-slot="collapse-content"
        data-state={expanded ? "open" : "closed"}
        className={cn(collapseContentInnerClassName({ variant: collapse.variant }), className)}
      >
        {typeof children === "function" ? children({ expanded }) : children}
      </div>
    </div>
  )
}
