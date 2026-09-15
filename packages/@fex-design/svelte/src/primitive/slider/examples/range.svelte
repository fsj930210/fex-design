<script lang="ts">
  import {
    SliderMark,
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
  } from "@fex-design/svelte/primitive/slider";
</script>

<SliderRoot defaultValue={[20, 80]} step={5} minStepsBetweenThumbs={2}
  ><SliderTrack><SliderRange /></SliderTrack><SliderThumb
    index={0}
    aria-label="下限"
  /><SliderThumb index={1} aria-label="上限" /></SliderRoot
>
