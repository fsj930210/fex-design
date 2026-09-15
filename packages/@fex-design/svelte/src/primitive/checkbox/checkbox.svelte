<script lang="ts">
  import {
    checkboxRootClassName,
    type CheckboxStyleProps,
  } from "@fex-design/styles/checkbox";
  import { cn } from "@fex/utils";
  import type { CheckboxValue } from "@fex-design/core/checkbox/types";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { setCheckboxRootContext } from "./context";
  interface Props extends HTMLAttributes<HTMLDivElement> {
    value?: CheckboxValue;
    disabled?: boolean;
    size?: CheckboxStyleProps["size"];
    children?: Snippet;
  }
  let {
    value,
    disabled,
    size = "md",
    class: className,
    children,
    ...rest
  }: Props = $props();
  const controlId = `checkbox-${Math.random().toString(36).slice(2)}`;
  setCheckboxRootContext({
    controlId,
    get value() {
      return value;
    },
    get disabled() {
      return disabled;
    },
  });
</script>

<div
  {...rest}
  data-slot="checkbox-root"
  data-size={size}
  class={cn(checkboxRootClassName({ size }), className)}
>
  {@render children?.()}
</div>
