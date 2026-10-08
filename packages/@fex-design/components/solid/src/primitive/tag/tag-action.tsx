import { tagActionClassName } from "@fex-design/components-styles/tag"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"
import { XIcon } from "@fex-design/solid/icons/x"

export interface TagActionProps extends ParentProps<JSX.ButtonHTMLAttributes<HTMLButtonElement>> {}

export function TagAction(props: TagActionProps) {
  const [local, rest] = splitProps(props, ["class", "children", "type", "aria-label"])
  return (
    <button
      {...rest}
      type={local.type ?? "button"}
      aria-label={local["aria-label"]}
      data-slot="tag-action"
      class={cn(tagActionClassName, local.class)}
    >
      {local.children ?? <XIcon aria-hidden />}
    </button>
  )
}
