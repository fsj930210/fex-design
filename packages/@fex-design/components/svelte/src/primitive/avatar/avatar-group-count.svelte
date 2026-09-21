<script lang="ts">
  import { avatarGroupOverflowClassName } from "@fex-design/components-styles/avatar";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class"> {
    class?: string;
    children?: Snippet;
  }
  let { class: className, children, ...rest }: Props = $props();
</script>

<span
  {...rest}
  data-slot="avatar-group-count"
  class={cn(avatarGroupOverflowClassName, className)}
  >{@render children?.()}</span
>
