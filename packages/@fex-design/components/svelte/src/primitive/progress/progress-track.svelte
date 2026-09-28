<script lang="ts">
  import { progressLineClassName } from "@fex-design/components-styles/progress"
  import { cn } from "@fex-design/utils"
  import { getContext, type Snippet } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"
  import { progressContextKey, type ProgressContext } from "./context"

  interface ProgressTrackProps extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet
  }

  let { class: className, style, children, ...rest }: ProgressTrackProps = $props()
  const { context } = getContext<ProgressContext>(progressContextKey)
  const current = $derived(context())
  const trackStyle = $derived(
    current.trackColor ? `background-color: ${current.trackColor}; ${style ?? ""}` : (style ?? "")
  )
</script>

<div
  {...rest}
  data-slot="progress-track"
  data-status={current.status}
  class={cn(progressLineClassName, className)}
  style={trackStyle}
>
  {@render children?.()}
</div>
