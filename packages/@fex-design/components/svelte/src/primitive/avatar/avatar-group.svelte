<script lang="ts">
  import { avatarGroupClassName } from "@fex-design/components-styles/avatar";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  interface Props {
    class?: string;
    children?: Snippet;
  }
  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  {...rest}
  role="group"
  data-slot="avatar-group"
  class={cn(avatarGroupClassName, className)}
>
  {@render children?.()}
</div>
