<script lang="ts">
  import {
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
  } from "@fex-design/svelte/primitive/slider";
  let values = $state([20, 50, 80]);
</script>

<div class="grid w-full max-w-xl gap-3">
  <SliderRoot value={values} editable minCount={2} maxCount={5} onChange={(next) => values = next}>
    <SliderTrack><SliderRange /></SliderTrack>
    {#each values as _, index}<SliderThumb {index} aria-label={`滑块 ${index + 1}`} />{/each}
  </SliderRoot>
  <p>当前节点：{values.join("、")}</p>
</div>
