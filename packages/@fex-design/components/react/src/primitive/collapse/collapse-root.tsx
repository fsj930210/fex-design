import { collapseRootClassName } from "@fex-design/components-styles/collapse"
import type { ExpansionChangeMeta, ExpansionKey } from "@fex-design/core/expansion/types"
import { cn } from "@fex-design/utils"
import type { HTMLAttributes, ReactNode, Ref } from "react"
import { CollapseContext, type CollapseSize, type CollapseVariant } from "./collapse-context"
import { useCollapse, type CollapseRef } from "./use-collapse"

export interface CollapseProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
  expandedKeys?: readonly ExpansionKey[]
  defaultExpandedKeys?: readonly ExpansionKey[]
  disabledKeys?: readonly ExpansionKey[]
  multiple?: boolean
  collapsible?: boolean
  variant?: CollapseVariant
  size?: CollapseSize
  ref?: Ref<CollapseRef>
  onChange?: (keys: ExpansionKey[], meta: ExpansionChangeMeta) => void
  children?: ReactNode
}
export type CollapseRootProps = CollapseProps

export function Collapse({
  expandedKeys,
  defaultExpandedKeys,
  disabledKeys,
  multiple,
  collapsible,
  onChange,
  variant = "outlined",
  size = "md",
  className,
  children,
  ref,
  ...props
}: CollapseProps) {
  const collapse = useCollapse({
    ...(expandedKeys === undefined ? {} : { expandedKeys }),
    ...(defaultExpandedKeys === undefined ? {} : { defaultExpandedKeys }),
    ...(disabledKeys === undefined ? {} : { disabledKeys }),
    ...(multiple === undefined ? {} : { multiple }),
    ...(collapsible === undefined ? {} : { collapsible }),
    ...(onChange === undefined ? {} : { onChange }),
    ...(ref === undefined ? {} : { ref }),
  })
  return (
    <CollapseContext value={{ ...collapse, variant, size }}>
      <div
        {...props}
        data-slot="collapse"
        data-variant={variant}
        className={cn(collapseRootClassName({ variant, size }), className)}
      >
        {children}
      </div>
    </CollapseContext>
  )
}

export { Collapse as CollapseRoot }
