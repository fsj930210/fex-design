<script lang="ts">
  import { progressValueClassName } from "@fex-design/components-styles/progress"
  import { cn } from "@fex-design/utils"
  import { getContext, type Snippet } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"
  import { progressContextKey, type ProgressContext } from "./context"

  interface ProgressValueProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: HTMLSpanElement | null
    children?: Snippet<[{ value: number | null; percentage: number | null }]>
  }

  let { ref = $bindable(null), class: className, children, ...rest }: ProgressValueProps = $props()
  const { context } = getContext<ProgressContext>(progressContextKey)
  const current = $derived(context())
</script>

<span
  bind:this={ref}
  {...rest}
  data-slot="progress-value"
  data-status={current.status}
  class={cn(progressValueClassName, className)}
>
  {#if children}{@render children({ value: current.value, percentage: current.percentage })}{/if}
</span>
