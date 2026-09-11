<script lang="ts">
  import { inputControlClassName } from "@fex-design/styles/input";
  import { cn } from "@fex/utils";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { getInputContext } from "./context";
  interface Props extends Omit<HTMLInputAttributes, "class" | "value"> {
    class?: string | undefined;
    ref?: HTMLInputElement | null;
  }
  let {
    class: className,
    oninput,
    ref = $bindable(null),
    ...rest
  }: Props = $props();
  const input = getInputContext("InputControl");
  export function focus() {
    ref?.focus();
  }
  export function blur() {
    ref?.blur();
  }
  export function select() {
    ref?.select();
  }
  // bind:this is the framework boundary that keeps the shared clear/focus controller attached to the live node.
  $effect(() => {
    input.setFocusElement(ref ?? null);
  });
</script>

<input
  {...rest}
  bind:this={ref}
  value={input.value()}
  disabled={input.disabled()}
  readonly={input.readOnly()}
  data-slot="input-control"
  class={cn(inputControlClassName, className)}
  oninput={(event) => {
    oninput?.(event);
    if (!event.defaultPrevented)
      input.setValue(event.currentTarget.value, "input", event);
  }}
/>
