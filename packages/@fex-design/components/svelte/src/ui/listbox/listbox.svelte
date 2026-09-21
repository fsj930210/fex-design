<script lang="ts">
  import { listboxRootClassName } from "@fex-design/components-styles/listbox";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import PrimitiveListbox from '@fex-design/svelte/primitive/listbox/listbox.svelte';

  let {
    class: className,
    children,
    ...rest
  }: { class?: string; children?: Snippet; [key: string]: unknown } = $props();
</script>

<PrimitiveListbox {...rest} class={cn(listboxRootClassName({}), className)}>
  {@render children?.()}
</PrimitiveListbox>
