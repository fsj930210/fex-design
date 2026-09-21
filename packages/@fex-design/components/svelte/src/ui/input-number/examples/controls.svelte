<script lang="ts">
  import InputNumber from "@fex-design/svelte/ui/input-number";
</script>

<div class="grid w-full gap-2">
  <p>默认控制与隐藏控制</p>
  <InputNumber defaultValue={8} />
  <InputNumber defaultValue={8} controls={false} />
</div>
