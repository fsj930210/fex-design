<script lang="ts">
  import { progressLabelClassName } from "@fex-design/components-styles/progress"
  import { cn } from "@fex-design/utils"
  import type { Snippet } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"

  interface ProgressLabelProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: HTMLSpanElement | null
    children?: Snippet
  }

  let { ref = $bindable(null), class: className, children, ...rest }: ProgressLabelProps = $props()
</script>

<span
  bind:this={ref}
  {...rest}
  data-slot="progress-label"
  class={cn(progressLabelClassName, className)}
>
  {@render children?.()}
</span>
