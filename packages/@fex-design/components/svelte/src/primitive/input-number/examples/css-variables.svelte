<script lang="ts">
  import {
    InputNumberRoot,
    InputNumberControl,
    InputNumberClear,
    InputNumberActions,
    InputNumberIncrement,
    InputNumberDecrement,
  } from "@fex-design/svelte/primitive/input-number";
  import { InputPrefix, InputSuffix } from "@fex-design/svelte/primitive/input";
  import {
    inputNumberStyleDemo as demo,
    inputNumberVariableClasses as classNames,
  } from "@fex-design/docs-shared/input-number-demo";
</script>

<div class="grid w-full gap-3">
  <InputNumberRoot defaultValue={demo.value} class={classNames.root}>
    <InputPrefix class={classNames.prefix}>{demo.prefix}</InputPrefix>
    <InputNumberControl class={classNames.control} />
    <InputNumberClear class={classNames.clear} />
    <InputSuffix class={classNames.suffix}>{demo.suffix}</InputSuffix>
    <InputNumberActions class={classNames.actions}>
      <InputNumberIncrement class={classNames.increment} />
      <InputNumberDecrement class={classNames.decrement} />
    </InputNumberActions>
  </InputNumberRoot>
</div>
