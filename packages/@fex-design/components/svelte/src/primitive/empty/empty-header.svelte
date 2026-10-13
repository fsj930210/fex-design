<script lang="ts">
  import { emptyHeaderClassName } from "@fex-design/components-styles/empty";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
    class?: string;
    children?: Snippet;
  }
  let { class: className, children, ...rest }: Props = $props();
</script>

<div {...rest} data-slot="empty-header" class={cn(emptyHeaderClassName, className)}>
  {@render children?.()}
</div>
