<script lang="ts">
  import { dialogActionsClassName } from "@fex-design/components-styles/dialog";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  let { children, class: className }: { children?: Snippet; class?: string } =
    $props();
</script>

<div data-slot="dialog-actions" class={cn(dialogActionsClassName, className)}>
  {@render children?.()}
</div>
