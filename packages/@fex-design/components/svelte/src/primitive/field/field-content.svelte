<script lang="ts">
  import { fieldContentClassName } from "@fex-design/components-styles/field";
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
  data-slot="field-content"
  class={cn(fieldContentClassName, className)}
>
  {@render children?.()}
</div>
