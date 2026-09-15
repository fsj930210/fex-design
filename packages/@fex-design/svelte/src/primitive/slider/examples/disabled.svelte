<script lang="ts">
  import {
    SliderMark,
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
  } from "@fex-design/svelte/primitive/slider";
  import { Checkbox } from "@fex-design/svelte/ui/checkbox";
  let disabledThumbs = $state([true, true, true]);
</script>

<div class="grid w-full max-w-2xl gap-10">
  <section class="grid gap-4"><h4>整体禁用</h4><SliderRoot defaultValue={[40]} disabled><SliderTrack><SliderRange /></SliderTrack><SliderThumb /></SliderRoot></section>
  <section class="grid gap-4"><h4>禁用指定 Thumb</h4><div class="flex flex-wrap gap-4">{#each disabledThumbs as checked, index}<Checkbox {checked} onchange={() => disabledThumbs[index] = !disabledThumbs[index]}>Thumb {index + 1}</Checkbox>{/each}</div><SliderRoot defaultValue={[20, 50, 80]} disabledThumbs={disabledThumbs}><SliderTrack><SliderRange /></SliderTrack>{#each disabledThumbs as disabled, index}<SliderThumb {index} {disabled} />{/each}</SliderRoot></section>
</div>
