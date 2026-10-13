<script lang="ts">
  import { cardTitleClassName } from "@fex-design/components-styles/card";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface CardTitleProps extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "class"
  > {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: CardTitleProps = $props();
</script>

<div {...rest} data-slot="card-title" class={cn(cardTitleClassName, className)}>
  {@render children?.()}
</div>
