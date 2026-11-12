<script lang="ts">
  let { invalid = false } = $props<{ invalid?: boolean }>();
  import { Checkbox, CheckboxGroup } from "@fex-design/svelte/ui/checkbox";
</script>

<div class="grid gap-3">
  <Checkbox aria-invalid={invalid}>接收产品更新</Checkbox><Checkbox
    aria-invalid={invalid}
    defaultChecked>接收安全提醒</Checkbox
  >
</div>
