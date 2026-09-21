<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import InputControl from "../input/input-control.svelte";
  import { getInputNumberContext } from "./context";
  let {
    inputmode = "decimal",
    onblur,
    onkeydown,
    ...rest
  }: HTMLInputAttributes = $props();
  const inputNumber = getInputNumberContext("InputNumberControl");
</script>

<InputControl
  {...rest}
  type="text"
  {inputmode}
  role="spinbutton"
  aria-valuemin={inputNumber.min()}
  aria-valuemax={inputNumber.max()}
  aria-valuenow={inputNumber.value()}
  aria-valuetext={inputNumber.formattedValue()}
  onblur={(event) => {
    onblur?.(event);
    if (!event.defaultPrevented) inputNumber.blur(event);
  }}
  onkeydown={(event) => {
    onkeydown?.(event);
    if (!event.defaultPrevented) inputNumber.keydown(event);
  }}
/>
