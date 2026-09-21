<script lang="ts">
  import { colorPickerTransparencyGridClassName } from "@fex-design/components-styles/color-picker";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  let { class: className, ...rest }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span {...rest} class={cn(colorPickerTransparencyGridClassName, className)} />
