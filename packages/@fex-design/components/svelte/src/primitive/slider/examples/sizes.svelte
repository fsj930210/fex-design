<script lang="ts">
  import {
    SliderMark,
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
  } from "@fex-design/svelte/primitive/slider";
</script>

<div class="grid w-full max-w-xl gap-6">
  <SliderRoot defaultValue={[50]} size="sm"
    ><SliderTrack><SliderRange /></SliderTrack><SliderThumb /></SliderRoot
  >
  <SliderRoot defaultValue={[50]} size="md"
    ><SliderTrack><SliderRange /></SliderTrack><SliderThumb /></SliderRoot
  >
  <SliderRoot defaultValue={[50]} size="lg"
    ><SliderTrack><SliderRange /></SliderTrack><SliderThumb /></SliderRoot
  >
</div>
