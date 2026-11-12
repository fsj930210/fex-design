<script lang="ts">
  import type { Snippet } from "svelte";
  import {
    formGroupClassName,
    formLegendClassName,
  } from "@fex-design/components-styles/form";
  import { cn } from "@fex-design/utils";
  import { getRoot } from "../../primitive/form/context";
  let {
    legend,
    children,
    class: className,
    classNames,
    styles,
    ...rest
  }: {
    legend?: Snippet;
    children?: Snippet;
    class?: string;
    classNames?: { root?: string; legend?: string };
    styles?: { root?: string; legend?: string };
  } = $props();
  getRoot();
</script>

<fieldset
  {...rest}
  data-slot="form-group"
  class={cn(formGroupClassName, classNames?.root, className)}
  style={styles?.root}
>
  {#if legend}<legend
      data-slot="form-legend"
      class={cn(formLegendClassName, classNames?.legend)}
      style={styles?.legend}>{@render legend()}</legend
    >{/if}
  {@render children?.()}
</fieldset>
