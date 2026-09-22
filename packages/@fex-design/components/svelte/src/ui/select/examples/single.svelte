<script lang="ts">import Select from '@fex-design/svelte/ui/select'; let value=$state('react'); const options=[{value:'react',label:'React'},{value:'vue',label:'Vue'},{value:'solid',label:'Solid'}]</script>
<Select class="w-72" {options} {value} onChange={(next)=>value=String(next)} />
