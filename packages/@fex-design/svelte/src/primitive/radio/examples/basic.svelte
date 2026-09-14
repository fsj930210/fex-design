<script lang="ts">
  import { Radio, RadioButton, RadioGroup } from '@fex-design/svelte/primitive/radio';
</script>

<div class="grid gap-4"><section class="grid gap-2"><span>Radio</span><RadioGroup defaultValue="apple" orientation="horizontal"><label class="inline-flex items-center gap-2"><Radio value="apple"/>苹果</label><label class="inline-flex items-center gap-2"><Radio value="pear"/>梨</label></RadioGroup></section><section class="grid gap-2"><span>RadioButton</span><RadioGroup defaultValue="apple" orientation="horizontal" class="gap-0"><RadioButton value="apple">苹果</RadioButton><RadioButton value="pear">梨</RadioButton></RadioGroup></section></div>
