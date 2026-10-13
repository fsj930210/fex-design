<script lang="ts">
  import { avatarGroupClassName } from "@fex-design/components-styles/avatar";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  interface Props extends HTMLAttributes<HTMLDivElement> {
    ref?: HTMLDivElement;
    class?: string;
    children?: Snippet;
  }
  let { class: className, children, ref = $bindable(), ...rest }: Props = $props();
</script>

<div
  bind:this={ref}
  {...rest}
  role="group"
  data-slot="avatar-group"
  class={cn(avatarGroupClassName, className)}
>
  {@render children?.()}
</div>
