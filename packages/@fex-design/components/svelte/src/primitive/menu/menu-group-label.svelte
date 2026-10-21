<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { menuGroupLabelClassName } from "@fex-design/components-styles/menu";
  import { cn } from "@fex-design/utils";
  let {
    children,
    class: className,
    ...rest
  }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
  {...rest}
  data-slot="menu-group-label"
  class={cn(menuGroupLabelClassName, className)}
>
  {@render children?.()}
</div>
