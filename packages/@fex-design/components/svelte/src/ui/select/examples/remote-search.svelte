<script lang="ts">
import Select from '@fex-design/svelte/ui/select'
const cities=[{value:'beijing',label:'北京',keywords:['beijing','bj']},{value:'shanghai',label:'上海',keywords:['shanghai','sh']},{value:'shenzhen',label:'深圳',keywords:['shenzhen','sz']},{value:'hangzhou',label:'杭州',keywords:['hangzhou','hz']},{value:'chengdu',label:'成都',keywords:['chengdu','cd']}]
let options=$state(cities.slice(0,3));let loading=$state(false);let requestId=0
async function search(keyword:string){const current=++requestId;loading=true;const result=await new Promise<typeof cities>((resolve)=>window.setTimeout(()=>{const query=keyword.trim().toLowerCase();resolve(query?cities.filter((city)=>city.label.includes(query)||city.keywords.some((item)=>item.includes(query))):cities.slice(0,3))},500));if(current!==requestId)return;options=result;loading=false}
</script>
<Select class="w-72" {options} defaultValue="beijing" searchable {loading} onSearch={(keyword)=>void search(keyword)} placeholder="输入城市或拼音" emptyText="未找到城市" />
