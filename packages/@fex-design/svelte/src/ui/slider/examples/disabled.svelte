<script lang="ts">
  import { Slider } from "@fex-design/svelte/ui/slider";
  import { Checkbox } from "@fex-design/svelte/ui/checkbox";
  let disabledThumbs = $state([true, true, true]);
</script>

<div class="grid w-full max-w-2xl gap-10">
  <section class="grid gap-4"><h4>整体禁用</h4><Slider defaultValue={40} disabled /></section>
  <section class="grid gap-4"><h4>禁用指定 Thumb</h4><div class="flex flex-wrap gap-4">{#each disabledThumbs as checked, index}<Checkbox {checked} onchange={() => disabledThumbs[index] = !disabledThumbs[index]}>Thumb {index + 1}</Checkbox>{/each}</div><Slider defaultValue={[20, 50, 80]} disabled={disabledThumbs} /></section>
</div>
