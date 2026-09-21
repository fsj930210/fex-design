<script lang="ts">
  import {
    fieldGroupClassName,
    type FieldGroupStyleProps,
  } from "@fex-design/components-styles/field";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  let {
    class: className,
    children,
    orientation,
    ...rest
  }: HTMLAttributes<HTMLDivElement> &
    FieldGroupStyleProps & { children?: Snippet } = $props();
</script>

<div
  {...rest}
  role={rest.role ?? "group"}
  data-slot="field-group"
  data-orientation={orientation}
  class={cn(fieldGroupClassName({ orientation }), className)}
>
  {@render children?.()}
</div>
