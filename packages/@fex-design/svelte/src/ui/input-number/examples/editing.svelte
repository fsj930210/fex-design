<script lang="ts">
  import InputNumber from "@fex-design/svelte/ui/input-number";
</script>

<div class="grid w-full gap-2">
  <p>可输入 -、1. 等编辑中间状态，失焦后提交。</p>
  <InputNumber defaultValue={1} precision={2} />
</div>
