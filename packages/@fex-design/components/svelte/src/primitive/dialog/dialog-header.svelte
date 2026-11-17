<script lang="ts">
  import { dialogHeaderClassName } from "@fex-design/components-styles/dialog";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  let { children, class: className }: { children?: Snippet; class?: string } =
    $props();
</script>

<div data-slot="dialog-header" class={cn(dialogHeaderClassName, className)}>
  {@render children?.()}
</div>
