<script lang="ts">
  import { progressLabelClassName } from "@fex-design/components-styles/progress"
  import { cn } from "@fex-design/utils"
  import type { Snippet } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"

  interface ProgressLabelProps extends HTMLAttributes<HTMLSpanElement> {
    children?: Snippet
  }

  let { class: className, children, ...rest }: ProgressLabelProps = $props()
</script>

<span
  {...rest}
  data-slot="progress-label"
  class={cn(progressLabelClassName, className)}
>
  {@render children?.()}
</span>
