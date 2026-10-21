<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  import { calendarFooterClassName } from "@fex-design/components-styles/calendar";
  import { cn } from "@fex-design/utils";

  type Props = HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement | null };
  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: Props = $props();
</script>

<div
  {...rest}
  bind:this={ref}
  data-slot="calendar-footer"
  class={cn(calendarFooterClassName, className)}
>
  {@render children?.()}
</div>
