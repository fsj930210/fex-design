<script lang="ts">
  import type { AlertOptions } from "@fex-design/core/alert/types";
  import { alertClassName } from "@fex-design/components-styles/alert";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props
    extends Omit<HTMLAttributes<HTMLDivElement>, "class">, AlertOptions {
    class?: string;
    children?: Snippet;
  }

  let {
    class: className,
    children,
    type = "info",
    variant = "filled",
    ...rest
  }: Props = $props();
</script>

<div
  data-slot="alert"
  role="alert"
  {...rest}
  class={cn(alertClassName({ type, variant }), className)}
>
  {@render children?.()}
</div>
