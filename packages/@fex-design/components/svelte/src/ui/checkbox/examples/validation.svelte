<script lang="ts">
  import { Checkbox, CheckboxGroup } from "@fex-design/svelte/ui/checkbox";
</script>

<div class="grid gap-3">
  <Checkbox aria-invalid="true" aria-describedby="checkbox-error"
    >同意服务条款</Checkbox
  >
  <p id="checkbox-error" class="text-sm text-destructive">
    继续前必须同意服务条款。
  </p>
</div>
