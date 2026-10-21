<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { menuSeparatorClassName } from "@fex-design/components-styles/menu";
  import { cn } from "@fex-design/utils";
  let {
    children,
    class: className,
    ...rest
  }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
  {...rest}
  role="separator"
  data-slot="menu-separator"
  class={cn(menuSeparatorClassName, className)}
>
  {@render children?.()}
</div>
