<script lang="ts">
  import { spinnerTextClassName } from "@fex-design/components-styles/spinner";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  let {
    class: className,
    children,
    ...rest
  }: HTMLAttributes<HTMLSpanElement> & { children?: Snippet } = $props();
</script>

<span
  {...rest}
  data-slot="spinner-text"
  class={cn(spinnerTextClassName, className)}>{@render children?.()}</span
>
