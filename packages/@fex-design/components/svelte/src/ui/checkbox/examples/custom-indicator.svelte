<script lang="ts">
  import { Checkbox, CheckboxGroup } from "@fex-design/svelte/ui/checkbox";
</script>

<div class="grid gap-3">
  {#snippet star()}★{/snippet}<Checkbox defaultChecked indicator={star}
    >收藏项目</Checkbox
  >
</div>
