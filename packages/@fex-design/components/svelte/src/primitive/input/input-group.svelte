<script lang="ts">
  import { inputGroupClassName } from "@fex-design/components-styles/input";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
    class?: string;
    children?: Snippet;
  }
  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  {...rest}
  role="group"
  data-slot="input-group"
  class={cn(inputGroupClassName, className)}
>
  {@render children?.()}
</div>
