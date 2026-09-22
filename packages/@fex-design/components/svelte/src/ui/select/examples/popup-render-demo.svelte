<script lang="ts">import Select from '@fex-design/svelte/ui/select'; const options=[{value:'react',label:'React'},{value:'vue',label:'Vue'}]</script>
{#snippet footer()}<div class="border-t border-border px-3 py-2 text-xs text-muted-foreground">选择常用框架</div>{/snippet}
<Select class="w-72" {options} {footer} />
