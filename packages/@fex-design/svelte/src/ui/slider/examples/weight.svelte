<script lang="ts">
  import { Slider } from "@fex-design/svelte/ui/slider";
  let value = $state(40);
</script>

<div class="grid w-full max-w-xl gap-3">
  <div class="flex justify-between"><span>模型准确率 {value}%</span><span>响应速度 {100 - value}%</span></div>
  <Slider {value} onChange={(next) => typeof next === "number" && (value = next)} classNames={{ track: "bg-orange-500", range: "bg-blue-500" }} aria-label="模型权重分配" />
</div>
