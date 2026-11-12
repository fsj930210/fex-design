<script lang="ts">
  let { invalid = false } = $props<{ invalid?: boolean }>();
  import { InputNumber } from "@fex-design/svelte/ui/input-number";
</script>

<div class="grid w-full gap-3">
  <label for="quantity">数量</label>
  <InputNumber aria-invalid={invalid} id="quantity" defaultValue={8} />
  <p class="text-sm text-muted-foreground">使用加减按钮或直接输入数字</p>
</div>
