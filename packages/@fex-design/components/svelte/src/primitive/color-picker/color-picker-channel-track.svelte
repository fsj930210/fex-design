<script lang="ts">
  import { colorPickerChannelTrackClassName } from "@fex-design/components-styles/color-picker";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    children?: Snippet;
  }
  let { class: className, children, ...rest }: Props = $props();
</script>

<span {...rest} class={cn(colorPickerChannelTrackClassName, className)}
  >{@render children?.()}</span
>
