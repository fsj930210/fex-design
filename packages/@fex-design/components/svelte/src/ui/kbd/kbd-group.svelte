<script lang="ts">
  import { kbdGroupClassName } from "@fex-design/components-styles/kbd";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
    class?: string;
    children?: Snippet;
  }
  let { class: className, children, ...rest }: Props = $props();
</script>

<div {...rest} data-slot="kbd-group" class={cn(kbdGroupClassName, className)}>
  {@render children?.()}
</div>
