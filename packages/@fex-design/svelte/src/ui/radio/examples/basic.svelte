<script lang="ts">
  import { RadioButtonGroup, RadioGroup } from '@fex-design/svelte/ui/radio';
</script>

<div class="grid gap-4"><section class="grid gap-2"><span class="text-sm text-muted-foreground">Radio</span><RadioGroup defaultValue="apple" orientation="horizontal" options={[{label:'苹果',value:'apple'},{label:'梨',value:'pear'}]}/></section><section class="grid gap-2"><span class="text-sm text-muted-foreground">RadioButton</span><RadioButtonGroup defaultValue="apple" orientation="horizontal" options={[{label:'苹果',value:'apple'},{label:'梨',value:'pear'}]}/></section></div>
