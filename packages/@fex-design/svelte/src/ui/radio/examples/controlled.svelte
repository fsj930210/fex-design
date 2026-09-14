<script lang="ts">
  import { Radio, RadioButton, RadioGroup, type RadioValue } from '@fex-design/svelte/ui/radio';
  import { Button } from '@fex-design/svelte/ui/button';
  let value = $state<RadioValue>('pear');
</script>

<div class="grid gap-3"><div class="flex gap-2"><Button size="sm" onclick={() => value = 'apple'}>选择苹果</Button><Button size="sm" onclick={() => value = 'pear'}>选择梨</Button></div><RadioGroup value={value} onValueChange={(next) => value = next} orientation="horizontal"><Radio value="apple">苹果</Radio><Radio value="pear">梨</Radio></RadioGroup><RadioGroup defaultValue="apple" orientation="horizontal"><Radio value="apple">非受控：苹果</Radio><Radio value="pear">非受控：梨</Radio></RadioGroup></div>
<RadioGroup value={value} onValueChange={(next) => value = next} orientation="horizontal" class="gap-0"><RadioButton value="apple">苹果按钮</RadioButton><RadioButton value="pear">梨按钮</RadioButton></RadioGroup>
