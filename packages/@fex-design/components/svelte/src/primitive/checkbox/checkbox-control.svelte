<script lang="ts">
  import type { CheckboxValue } from "@fex-design/core/checkbox/types";
  import { checkboxControlClassName } from "@fex-design/components-styles/checkbox";
  import { cn } from "@fex-design/utils";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { getCheckboxGroupContext, getCheckboxRootContext } from "./context";

  interface Props extends Omit<HTMLInputAttributes, "type" | "size" | "value"> {
    value?: CheckboxValue;
    indeterminate?: boolean;
  }
  let {
    id,
    value,
    name,
    checked = $bindable(),
    defaultChecked,
    disabled,
    indeterminate = false,
    class: className,
    onchange,
    ...rest
  }: Props = $props();
  let control: HTMLInputElement;
  const root = getCheckboxRootContext();
  const group = getCheckboxGroupContext();
  const currentValue = $derived(value ?? root?.value);
  const inGroup = $derived(Boolean(group && currentValue !== undefined));
  const currentChecked = $derived(
    inGroup ? group!.value().includes(currentValue!) : checked,
  );
  const currentDisabled = $derived(
    Boolean(disabled || root?.disabled || group?.disabled()),
  );
  $effect(() => {
    if (control) control.indeterminate = indeterminate;
  });
</script>

<input
  {...rest}
  bind:this={control}
  id={id ?? root?.controlId}
  type="checkbox"
  {name}
  value={currentValue}
  checked={currentChecked}
  {defaultChecked}
  disabled={currentDisabled}
  data-slot="checkbox-control"
  class={cn(checkboxControlClassName, className)}
  onchange={(event) => {
    onchange?.(event);
    if (!event.defaultPrevented && inGroup) group!.toggle(currentValue!);
  }}
/>
