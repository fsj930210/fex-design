<script lang="ts">
  import { treeTitleClassName } from "@fex-design/components-styles/tree";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    children?: Snippet;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<span
  {...rest}
  data-slot="tree-title"
  class={cn(treeTitleClassName, className)}
>
  {@render children?.()}
</span>
