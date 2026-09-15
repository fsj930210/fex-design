<script lang="ts">
  import { Checkbox, CheckboxGroup } from "@fex-design/svelte/ui/checkbox";
  const values = ["read", "write", "publish"];
  let selected = $state(["read"]);
  const all = $derived(selected.length === values.length);
  const partial = $derived(selected.length > 0 && !all);
</script>

<div class="grid gap-3">
  <Checkbox
    checked={all}
    indeterminate={partial}
    onchange={(event) =>
      (selected = event.currentTarget.checked ? [...values] : [])}
    >全部权限</Checkbox
  ><CheckboxGroup value={selected} onChange={(value) => (selected = value)}
    ><Checkbox value="read">读取</Checkbox><Checkbox value="write"
      >编辑</Checkbox
    ><Checkbox value="publish">发布</Checkbox></CheckboxGroup
  >
</div>
