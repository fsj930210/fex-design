<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { datePickerPresetClassName } from "@fex-design/components-styles/date-picker";
  import { cn } from "@fex-design/utils";
  import { Button } from "@fex-design/svelte/primitive/button";
  interface Props extends Omit<HTMLButtonAttributes, "children" | "class"> {
    class?: string;
    children?: Snippet;
  }
  let { class: className, children, ...rest }: Props = $props();
</script>

<Button
  {...rest}
  type="button"
  data-slot="date-picker-preset"
  class={cn(datePickerPresetClassName, className)}
>
  {@render children?.()}
</Button>
