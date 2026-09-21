<script lang="ts">
  import InputNumber from "@fex-design/svelte/ui/input-number";
</script>

<div class="grid w-full gap-2">
  <p>范围：0–10 · 步长：0.25 · 精度：2</p>
  <InputNumber defaultValue={8.25} min={0} max={10} step={0.25} precision={2} />
</div>
