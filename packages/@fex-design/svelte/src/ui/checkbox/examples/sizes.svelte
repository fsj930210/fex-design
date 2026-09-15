<script lang="ts">
  import { Checkbox, CheckboxGroup } from "@fex-design/svelte/ui/checkbox";
</script>

<div class="grid gap-3">
  <Checkbox defaultChecked size="sm">小尺寸</Checkbox><Checkbox
    defaultChecked
    size="md">中尺寸</Checkbox
  ><Checkbox defaultChecked size="lg">大尺寸</Checkbox>
</div>
