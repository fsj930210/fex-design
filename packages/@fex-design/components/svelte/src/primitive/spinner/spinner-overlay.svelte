<script lang="ts">
  import { spinnerOverlayClassName } from "@fex-design/components-styles/spinner";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  let {
    class: className,
    children,
    ...rest
  }: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
</script>

<div
  {...rest}
  data-slot="spinner-overlay"
  class={cn(spinnerOverlayClassName, className)}
>
  {@render children?.()}
</div>
