<script lang="ts">
  import { Button } from '@fex-design/svelte/primitive/button';
  import { CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxLabel } from '@fex-design/svelte/primitive/checkbox';
  let checked = $state(true);
</script>
<div class="grid gap-3"><div class="flex gap-2"><Button size="sm" onclick={() => checked = true}>选中</Button><Button size="sm" onclick={() => checked = false}>取消选中</Button></div><CheckboxRoot><CheckboxControl {checked} onchange={(event) => checked = event.currentTarget.checked} /><CheckboxIndicator /><CheckboxLabel>受控 Checkbox</CheckboxLabel></CheckboxRoot><CheckboxRoot><CheckboxControl defaultChecked /><CheckboxIndicator /><CheckboxLabel>非受控：默认选中</CheckboxLabel></CheckboxRoot></div>
