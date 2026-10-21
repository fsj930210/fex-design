<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { menuGroupClassName } from "@fex-design/components-styles/menu";
  import { cn } from "@fex-design/utils";
  let {
    children,
    class: className,
    ...rest
  }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
  {...rest}
  role="group"
  data-slot="menu-group"
  class={cn(menuGroupClassName, className)}
>
  {@render children?.()}
</div>
