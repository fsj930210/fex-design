<script lang="ts">
  import { Slider } from "@fex-design/svelte/ui/slider";
  let values = $state([20, 50, 80]);
</script>

<div class="grid w-full max-w-xl gap-3">
  <Slider
    value={values}
    editable
    minCount={2}
    maxCount={5}
    onChange={(next) => Array.isArray(next) && (values = next)}
  />
  <p>当前节点：{values.join("、")}</p>
</div>
