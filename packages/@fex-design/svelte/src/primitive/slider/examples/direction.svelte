<script lang="ts">
  import {
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
  } from "@fex-design/svelte/primitive/slider";
</script>

<div class="grid w-full max-w-xl gap-6">
  <section dir="ltr">
    <p>中文 LTR</p>
    <SliderRoot defaultValue={[30]}
      ><SliderTrack><SliderRange /></SliderTrack><SliderThumb /></SliderRoot
    >
  </section>
  <section dir="rtl">
    <p>العربية RTL</p>
    <SliderRoot defaultValue={[30]} direction="rtl"
      ><SliderTrack><SliderRange /></SliderTrack><SliderThumb /></SliderRoot
    >
  </section>
  <section><p>Reverse</p><SliderRoot defaultValue={[30]} reverse><SliderTrack><SliderRange /></SliderTrack><SliderThumb /></SliderRoot></section>
  <div class="flex h-48 gap-12">
    <section class="grid gap-2"><p>垂直</p><SliderRoot orientation="vertical" defaultValue={[35]}><SliderTrack><SliderRange /></SliderTrack><SliderThumb /></SliderRoot></section>
    <section class="grid gap-2"><p>垂直 Reverse</p><SliderRoot orientation="vertical" reverse defaultValue={[35]}><SliderTrack><SliderRange /></SliderTrack><SliderThumb /></SliderRoot></section>
  </div>
</div>
