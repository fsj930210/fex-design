<script lang="ts">
  import {
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
  } from "@fex-design/svelte/primitive/slider";
  let value = $state([40]);
</script>

<div class="grid w-full max-w-xl gap-3">
  <div class="flex justify-between">
    <span>模型准确率 {value[0]}%</span><span>响应速度 {100 - value[0]}%</span>
  </div>
  <SliderRoot {value} onChange={(next) => (value = next)}>
    <SliderTrack class="bg-orange-500"
      ><SliderRange class="bg-blue-500" /></SliderTrack
    >
    <SliderThumb
      aria-label="模型权重分配"
      aria-valuetext={`模型准确率 ${value[0]}%，响应速度 ${100 - value[0]}%`}
    />
  </SliderRoot>
</div>
