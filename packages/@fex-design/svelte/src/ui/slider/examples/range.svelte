<script lang="ts">
  import { Slider } from "@fex-design/svelte/ui/slider";
</script>

<div class="grid w-full max-w-xl gap-6">
  <Slider defaultValue={[20, 80]} step={5} minStepsBetweenThumbs={2} /><Slider
    defaultValue={[15, 40, 70]}
  />
</div>
