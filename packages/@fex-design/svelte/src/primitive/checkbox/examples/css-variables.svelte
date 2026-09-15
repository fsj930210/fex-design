<script lang="ts">
  import {
    CheckboxRoot,
    CheckboxControl,
    CheckboxIndicator,
    CheckboxLabel,
    CheckboxGroup,
  } from "@fex-design/svelte/primitive/checkbox";
</script>

<div class="grid gap-3">
  <CheckboxRoot
    style="--checkbox-size:1.25rem;--checkbox-checked-background:#7c3aed;--checkbox-indicator-color:white"
    ><CheckboxControl defaultChecked /><CheckboxIndicator /><CheckboxLabel
      >品牌色 Checkbox</CheckboxLabel
    ></CheckboxRoot
  >
</div>
