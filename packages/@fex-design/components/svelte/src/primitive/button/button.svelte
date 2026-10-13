<script lang="ts">
  import { buttonClassName } from "@fex-design/components-styles/button";
  import { cn } from "@fex-design/utils";
  import type { ButtonProps } from "./button.types";

  let {
    class: className,
    children,
    ref = $bindable(null),
    type = "button",
    variant = "outlined",
    color,
    ...rest
  }: ButtonProps = $props();
</script>

<button
  bind:this={ref}
  data-slot="button"
  data-variant={variant}
  data-color={color}
  {...rest}
  class={cn(buttonClassName({ variant, color }), className)}
  {type}
>
  {@render children?.()}
</button>
