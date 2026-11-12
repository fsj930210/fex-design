<script lang="ts">
  let { invalid = false } = $props<{ invalid?: boolean }>();
  import { Input } from "@fex-design/svelte/ui/input";
</script>

<div class="grid w-full gap-3">
  <Input aria-invalid={invalid} placeholder="请输入内容" /><Input
    aria-invalid={invalid}
    defaultValue="可清除内容"
    clearable
  />
</div>
