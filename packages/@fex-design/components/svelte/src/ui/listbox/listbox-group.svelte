<script lang="ts">
  import { listboxGroupClassName } from "@fex-design/components-styles/listbox";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import PrimitiveListboxGroup from '@fex-design/svelte/primitive/listbox/listbox-group.svelte';

  let {
    class: className,
    children,
    ...rest
  }: { class?: string; children?: Snippet; [key: string]: unknown } = $props();
</script>

<PrimitiveListboxGroup {...rest} class={cn(listboxGroupClassName, className)}>
  {@render children?.()}
</PrimitiveListboxGroup>
