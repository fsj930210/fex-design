import type { ComponentProps, Ref } from "react"
import { useContextMenuContent } from "./use-context-menu"

export interface ContextMenuContentProps extends ComponentProps<"div"> {
  ref?: Ref<HTMLDivElement>
}

export function ContextMenuContent({ children, ...props }: ContextMenuContentProps) {
  const content = useContextMenuContent(props)
  if (!content.mounted) return null
  return <div {...content.props}>{children}</div>
}
