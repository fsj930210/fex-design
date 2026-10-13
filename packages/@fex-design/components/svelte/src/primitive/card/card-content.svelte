<script lang="ts">
  import { cardContentClassName } from "@fex-design/components-styles/card";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface CardContentProps extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "class"
  > {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: CardContentProps = $props();
</script>

<div {...rest} data-slot="card-content" class={cn(cardContentClassName, className)}>
  {@render children?.()}
</div>
