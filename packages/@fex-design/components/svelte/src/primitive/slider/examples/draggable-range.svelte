<script lang="ts">
  import {
    SliderMark,
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
  } from "@fex-design/svelte/primitive/slider";
</script>

<SliderRoot defaultValue={[20, 50]} draggableRange
  ><SliderTrack><SliderRange /></SliderTrack><SliderThumb
    index={0}
  /><SliderThumb index={1} /></SliderRoot
>
