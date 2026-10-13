<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import InputControl from "../input/input-control.svelte";
  import { getInputNumberContext } from "./context";
  interface Props extends Omit<HTMLInputAttributes, 'value' | 'defaultValue' | 'type'> {
    ref?: HTMLInputElement | null | undefined;
  }
  let {
    inputmode = "decimal",
    onblur,
    onkeydown,
    'aria-valuetext': ariaValueText,
    ref = $bindable(null),
    ...rest
  }: Props = $props();
  const inputNumber = getInputNumberContext("InputNumberControl");
  export function focus(options?: FocusOptions) { ref?.focus(options); }
  export function blur() { ref?.blur(); }
  export function select() { ref?.select(); }
  export function getElement() { return ref; }
</script>

<InputControl
  {...rest}
  bind:ref
  type="text"
  {inputmode}
  role="spinbutton"
  aria-valuemin={inputNumber.min()}
  aria-valuemax={inputNumber.max()}
  aria-valuenow={inputNumber.value()}
  aria-valuetext={ariaValueText ?? inputNumber.formattedValue()}
  onblur={(event) => {
    onblur?.(event);
    if (!event.defaultPrevented) inputNumber.blur(event);
  }}
  onkeydown={(event) => {
    onkeydown?.(event);
    if (!event.defaultPrevented) inputNumber.keydown(event);
  }}
/>
