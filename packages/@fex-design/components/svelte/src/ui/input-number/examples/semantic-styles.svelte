<script lang="ts">
import { InputNumber } from '@fex-design/svelte/ui/input-number'
import { inputNumberStyleDemo as demo, inputNumberSemanticClasses as classNames } from '@fex-design/docs-shared/input-number-demo'
</script>
<div class="grid w-full gap-3">
  <InputNumber defaultValue={demo.value} clearable {classNames}>
    {#snippet prefix()}{demo.prefix}{/snippet}
    {#snippet suffix()}{demo.suffix}{/snippet}
  </InputNumber>
</div>
