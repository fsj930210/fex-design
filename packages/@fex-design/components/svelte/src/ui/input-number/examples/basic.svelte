<script lang="ts">
  import InputNumber from "@fex-design/svelte/ui/input-number";
</script>

<div class="grid w-full gap-2">
  <label for="quantity">数量</label>
  <InputNumber id="quantity" defaultValue={8} />
  <p class="text-sm text-muted-foreground">使用加减按钮或直接输入数字</p>
</div>
