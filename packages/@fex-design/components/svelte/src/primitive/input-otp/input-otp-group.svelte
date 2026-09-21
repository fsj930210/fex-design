<script lang="ts">
  import { inputOTPGroupClassName } from "@fex-design/components-styles/input-otp";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  let {
    children,
    class: className,
    ...rest
  }: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
</script>

<div
  {...rest}
  data-slot="input-otp-group"
  class={cn(inputOTPGroupClassName, className)}
>
  {@render children?.()}
</div>
