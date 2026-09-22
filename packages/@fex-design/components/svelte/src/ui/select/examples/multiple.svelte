<script lang="ts">import Select from '@fex-design/svelte/ui/select'; const options=[{value:'react',label:'React'},{value:'vue',label:'Vue'},{value:'solid',label:'Solid'}]</script>
<Select class="w-72" {options} multiple defaultValue={['react','vue']} maxTagCount={2} />
