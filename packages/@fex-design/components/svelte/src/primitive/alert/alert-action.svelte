<script lang="ts">
  import { alertActionClassName } from "@fex-design/components-styles/alert";
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
  data-slot="alert-action"
  class={cn(alertActionClassName, className)}
>
  {@render children?.()}
</div>
