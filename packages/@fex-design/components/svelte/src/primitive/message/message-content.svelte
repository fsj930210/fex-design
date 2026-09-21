<script lang="ts">
  import { messageContentClassName } from "@fex-design/components-styles/message";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }
  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  {...rest}
  data-slot="message-content"
  class={cn(messageContentClassName, className)}
>
  {@render children?.()}
</div>
