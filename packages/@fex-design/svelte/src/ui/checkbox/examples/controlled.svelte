<script lang="ts">
  import { Button } from '@fex-design/svelte/ui/button';
  import { Checkbox } from '@fex-design/svelte/ui/checkbox';
  let checked = $state(true);
</script>
<div class="grid gap-3"><div class="flex gap-2"><Button size="sm" onclick={() => checked = true}>选中</Button><Button size="sm" onclick={() => checked = false}>取消选中</Button></div><Checkbox {checked} onchange={(event) => checked = event.currentTarget.checked}>受控 Checkbox</Checkbox><Checkbox defaultChecked>非受控：默认选中</Checkbox></div>
