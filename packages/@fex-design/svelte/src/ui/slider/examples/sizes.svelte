<script lang="ts">
  import { Slider } from "@fex-design/svelte/ui/slider";
</script>

<div class="grid w-full max-w-xl gap-6">
  <Slider size="sm" defaultValue={25} /><Slider
    size="md"
    defaultValue={50}
  /><Slider size="lg" defaultValue={75} />
</div>
