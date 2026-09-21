<script lang="ts">
  import { checkboxLabelClassName } from "@fex-design/components-styles/checkbox";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import type { HTMLLabelAttributes } from "svelte/elements";
  import { getCheckboxRootContext } from "./context";
  interface Props extends HTMLLabelAttributes {
    children?: Snippet;
  }
  let { for: htmlFor, class: className, children, ...rest }: Props = $props();
  const root = getCheckboxRootContext();
</script>

<label
  {...rest}
  for={htmlFor ?? root?.controlId}
  data-slot="checkbox-label"
  class={cn(checkboxLabelClassName, className)}>{@render children?.()}</label
>
