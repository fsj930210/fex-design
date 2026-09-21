<script lang="ts">
  import { inputNumberActionsClassName } from "@fex-design/components-styles/input-number";
  import { cn } from "@fex-design/utils";
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
