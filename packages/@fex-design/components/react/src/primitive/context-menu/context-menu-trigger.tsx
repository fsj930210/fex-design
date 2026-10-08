import type { HTMLAttributes, ReactNode, Ref } from "react"
import { useContextMenuTrigger } from "./use-context-menu"

export type ContextMenuTriggerRenderProps<TElement extends HTMLElement = HTMLElement> = Omit<
  HTMLAttributes<TElement>,
  "ref"
> & {
  ref: Ref<TElement>
  "aria-haspopup": "menu"
  "data-state": "open" | "closed"
}

export interface ContextMenuTriggerProps<T = unknown, TElement extends HTMLElement = HTMLElement> {
  payload?: T
  children: (props: ContextMenuTriggerRenderProps<TElement>) => ReactNode
}

export function ContextMenuTrigger<T = unknown, TElement extends HTMLElement = HTMLElement>({
  payload,
  children,
}: ContextMenuTriggerProps<T, TElement>) {
  const trigger = useContextMenuTrigger<T, TElement>(payload === undefined ? {} : { payload })
  return children(trigger.props)
}
