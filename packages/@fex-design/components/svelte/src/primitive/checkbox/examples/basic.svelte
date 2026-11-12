<script lang="ts">
  let { invalid = false } = $props<{ invalid?: boolean }>();
  import {
    CheckboxRoot,
    CheckboxControl,
    CheckboxIndicator,
    CheckboxLabel,
    CheckboxGroup,
  } from "@fex-design/svelte/primitive/checkbox";
</script>

<div class="grid gap-3">
  <CheckboxRoot aria-invalid={invalid}
    ><CheckboxControl /><CheckboxIndicator /><CheckboxLabel
      >接收产品更新</CheckboxLabel
    ></CheckboxRoot
  ><CheckboxRoot aria-invalid={invalid}
    ><CheckboxControl defaultChecked /><CheckboxIndicator /><CheckboxLabel
      >接收安全提醒</CheckboxLabel
    ></CheckboxRoot
  >
</div>
