<script lang="ts">
  import { cardFooterClassName } from "@fex-design/components-styles/card";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface CardFooterProps extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "class"
  > {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: CardFooterProps = $props();
</script>

<div
  {...rest}
  data-slot="card-footer"
  class={cn(cardFooterClassName, className)}
>
  {@render children?.()}
</div>
