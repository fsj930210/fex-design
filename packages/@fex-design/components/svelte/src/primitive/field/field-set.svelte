<script lang="ts">
  import { fieldSetClassName } from "@fex-design/components-styles/field";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  let {
    class: className,
    children,
    ...rest
  }: HTMLAttributes<HTMLFieldSetElement> & { children?: Snippet } = $props();
</script>

<fieldset
  {...rest}
  data-slot="field-set"
  class={cn(fieldSetClassName, className)}
>
  {@render children?.()}
</fieldset>
