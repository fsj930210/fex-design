<script lang="ts">
  import { cardDescriptionClassName } from "@fex-design/components-styles/card";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface CardDescriptionProps extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "class"
  > {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: CardDescriptionProps = $props();
</script>

<div {...rest} data-slot="card-description" class={cn(cardDescriptionClassName, className)}>
  {@render children?.()}
</div>
