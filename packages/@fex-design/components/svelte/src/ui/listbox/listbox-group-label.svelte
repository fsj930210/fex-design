<script lang="ts">
  import { listboxGroupLabelClassName } from "@fex-design/components-styles/listbox";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import PrimitiveListboxGroupLabel from '@fex-design/svelte/primitive/listbox/listbox-group-label.svelte';

  let {
    class: className,
    children,
    ...rest
  }: { class?: string; children?: Snippet; [key: string]: unknown } = $props();
</script>

<PrimitiveListboxGroupLabel
  {...rest}
  class={cn(listboxGroupLabelClassName, className)}
>
  {@render children?.()}
</PrimitiveListboxGroupLabel>
