<script lang="ts">import Select from '@fex-design/svelte/ui/select'; const options=[{value:'react',label:'React'},{value:'vue',label:'Vue'}]</script>
{#snippet prefix()}框架{/snippet}{#snippet suffix()}⌘K{/snippet}
<Select class="w-72" {options} {prefix} {suffix} placeholder="请选择" />
