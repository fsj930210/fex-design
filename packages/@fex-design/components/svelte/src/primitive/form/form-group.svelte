<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLFieldsetAttributes } from "svelte/elements";
  import { formGroupClassName } from "@fex-design/components-styles/form";
  import { cn } from "@fex-design/utils";
  import { getRoot } from "./context";
  let {
    ref = $bindable<HTMLFieldSetElement | null>(null),
    children,
    class: className,
    ...rest
  }: HTMLFieldsetAttributes & {
    children?: Snippet;
    ref?: HTMLFieldSetElement | null;
  } = $props();
  getRoot();
</script>

<fieldset
  bind:this={ref}
  {...rest}
  data-slot="form-group"
  class={cn(formGroupClassName, className)}
>
  {@render children?.()}
</fieldset>
