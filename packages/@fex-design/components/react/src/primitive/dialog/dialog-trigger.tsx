import type { ComponentProps, ReactNode, Ref } from "react"
import { useDialogTrigger } from "./use-dialog-trigger"

export type DialogTriggerRenderProps = Omit<ComponentProps<"button">, "children" | "ref"> & {
  "data-state": "open" | "closed"
  ref: Ref<HTMLButtonElement>
}

export interface DialogTriggerProps extends Omit<ComponentProps<"button">, "children"> {
  children: (props: DialogTriggerRenderProps) => ReactNode
  ref?: Ref<HTMLButtonElement>
}

export function DialogTrigger({ children, ...props }: DialogTriggerProps) {
  const trigger = useDialogTrigger(props)
  return children(trigger.props)
}
