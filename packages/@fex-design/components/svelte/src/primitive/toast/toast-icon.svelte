<script lang="ts">
  import { toastIconClassName } from "@fex-design/components-styles/toast";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<div {...rest} data-slot="toast-icon" class={cn(toastIconClassName, className)}>
  {@render children?.()}
</div>
