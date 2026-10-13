<script lang="ts">
  import { buttonGroupClassName } from "@fex-design/components-styles/button";
  import { cn } from "@fex-design/utils";
  import type { ButtonGroupProps } from "./button.types";
  let {
    class: className,
    style,
    spacing = 0,
    orientation = "horizontal",
    children,
    ...rest
  }: ButtonGroupProps = $props();
</script>

<div
  {...rest}
  role="group"
  data-slot="button-group"
  data-orientation={orientation}
  class={cn(
    buttonGroupClassName({ orientation, connected: spacing === 0 }),
    className,
  )}
  {style}
  style:gap={typeof spacing === "number" ? `${spacing}px` : spacing}
>
  {@render children?.()}
</div>
