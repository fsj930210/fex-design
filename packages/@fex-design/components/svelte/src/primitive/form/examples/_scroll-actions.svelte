<script lang="ts">
  import { getFormActions } from "@fex-design/svelte/primitive/form";
  import { Button } from "@fex-design/svelte/primitive/button";

  const actions = getFormActions();
</script>

<div class="flex flex-wrap gap-3">
  <Button type="submit" variant="solid" color="primary">校验并定位首错</Button
  ><Button type="button" onclick={() => actions.scrollToField("notes")}
    >定位备注错误</Button
  >
</div>
