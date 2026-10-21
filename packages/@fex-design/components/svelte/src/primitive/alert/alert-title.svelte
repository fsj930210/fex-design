<script lang="ts">
  import { alertTitleClassName } from "@fex-design/components-styles/alert";
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
  data-slot="alert-title"
  class={cn(alertTitleClassName, className)}
>
  {@render children?.()}
</div>
