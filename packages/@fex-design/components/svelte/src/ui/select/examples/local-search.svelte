<script lang="ts">import Select from '@fex-design/svelte/ui/select'; const options=[{value:'beijing',label:'北京'},{value:'shanghai',label:'上海'},{value:'shenzhen',label:'深圳'}]</script>
<Select class="w-72" {options} searchable filterOption={(keyword,option)=>option.label.includes(keyword)} placeholder="搜索城市" />
