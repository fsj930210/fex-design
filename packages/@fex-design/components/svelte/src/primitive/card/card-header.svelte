<script lang="ts">
  import { cardHeaderClassName } from "@fex-design/components-styles/card";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface CardHeaderProps extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "class"
  > {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: CardHeaderProps = $props();
</script>

<div
  {...rest}
  data-slot="card-header"
  class={cn(cardHeaderClassName, className)}
>
  {@render children?.()}
</div>
