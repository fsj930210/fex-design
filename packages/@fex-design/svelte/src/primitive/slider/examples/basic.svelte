<script lang="ts">
  import {
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
  } from "@fex-design/svelte/primitive/slider";
  let value = $state([42]);
  let ended = $state([42]);
</script>

<div class="grid w-full max-w-xl gap-4">
  <SliderRoot
    {value}
    onChange={(next) => value = next}
    onEnd={(next) => ended = next}
    ><SliderTrack><SliderRange /></SliderTrack><SliderThumb
      aria-label="音量"
    /></SliderRoot
  ><p>当前值：{value[0]}；结束值：{ended[0]}</p><SliderRoot defaultValue={[60]} keyboard={false}
    ><SliderTrack><SliderRange /></SliderTrack><SliderThumb
      aria-label="无键盘操作"
    /></SliderRoot
  >
</div>
