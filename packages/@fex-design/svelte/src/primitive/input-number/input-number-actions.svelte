<script lang="ts">
  import { inputNumberActionsClassName } from "@fex-design/styles/input-number";
  import { cn } from "@fex/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  let {
    class: className,
    children,
    ...rest
  }: HTMLAttributes<HTMLSpanElement> & { children?: Snippet } = $props();
</script>

<span
  {...rest}
  data-slot="input-number-actions"
  class={cn(inputNumberActionsClassName, className)}
  >{@render children?.()}</span
>
