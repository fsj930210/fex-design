<script lang="ts">
  import { SliderMark, SliderRange, SliderRoot, SliderThumb, SliderTrack } from "@fex-design/svelte/primitive/slider";
  let recommended = $state(37);
  const marks = $derived([0, 26, recommended, 100]);
</script>

<div class="grid w-full max-w-2xl gap-8 pb-6">
  <button onclick={() => (recommended = recommended === 37 ? 60 : 37)}>将建议刻度移到 {recommended === 37 ? 60 : 37}°C</button>
  <section class="grid gap-4"><h4>included=true（单值与范围）</h4>
    <SliderRoot defaultValue={[37]} {marks}><SliderTrack><SliderRange />{#each marks as value (value)}<SliderMark {value}>{value === recommended ? `建议 ${value}°C` : `${value}°C`}</SliderMark>{/each}</SliderTrack><SliderThumb /></SliderRoot>
    <SliderRoot defaultValue={[26, 37]} {marks}><SliderTrack><SliderRange />{#each marks as value (value)}<SliderMark {value}>{value === recommended ? `建议 ${value}°C` : `${value}°C`}</SliderMark>{/each}</SliderTrack><SliderThumb index={0} /><SliderThumb index={1} /></SliderRoot>
  </section>
  <section class="grid gap-4"><h4>included=false（刻度彼此独立）</h4><SliderRoot defaultValue={[37]} {marks}><SliderTrack>{#each marks as value (value)}<SliderMark {value}>{value === recommended ? `建议 ${value}°C` : `${value}°C`}</SliderMark>{/each}</SliderTrack><SliderThumb /></SliderRoot></section>
  <section class="grid gap-4"><h4>marks &amp; step（步长与刻度并存）</h4><SliderRoot defaultValue={[37]} {marks} step={10}><SliderTrack><SliderRange />{#each Array.from({ length: 11 }, (_, i) => i * 10) as value}<SliderMark {value} aria-hidden="true" />{/each}{#each marks as value (value)}<SliderMark {value}>{value === recommended ? `建议 ${value}°C` : `${value}°C`}</SliderMark>{/each}</SliderTrack><SliderThumb /></SliderRoot></section>
  <section class="grid gap-4"><h4>step=null（只能落在标记点）</h4><SliderRoot defaultValue={[37]} {marks} step={null}><SliderTrack><SliderRange />{#each marks as value (value)}<SliderMark {value}>{value === recommended ? `建议 ${value}°C` : `${value}°C`}</SliderMark>{/each}</SliderTrack><SliderThumb /></SliderRoot></section>
</div>
