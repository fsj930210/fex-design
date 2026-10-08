import { spinnerClassName } from "@fex-design/components-styles/spinner"
import { cn } from "@fex-design/utils"
import type { SpinnerOptions } from "@fex-design/core/spinner/types"
import type { JSX } from "solid-js"
import { splitProps } from "solid-js"
import { LoadingIcon } from "@fex-design/solid/icons/loading"

export type SpinnerProps = JSX.HTMLAttributes<HTMLSpanElement> & SpinnerOptions
export type SpinnerRootProps = SpinnerProps

export function Spinner(props: SpinnerProps) {
  const [local, rest] = splitProps(props, ["class", "size", "children"])
  return (
    <span
      {...rest}
      data-slot="spinner"
      role="status"
      class={cn(spinnerClassName({ size: local.size }), local.class)}
    >
      {local.children ?? <LoadingIcon class="animate-spin" />}
    </span>
  )
}

export { Spinner as SpinnerRoot }
