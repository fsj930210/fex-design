<script setup lang="ts">
import { ref } from 'vue'
import { Select } from '@fex-design/vue/ui/select'
const cities=[{value:'beijing',label:'北京',keywords:['beijing','bj']},{value:'shanghai',label:'上海',keywords:['shanghai','sh']},{value:'shenzhen',label:'深圳',keywords:['shenzhen','sz']},{value:'hangzhou',label:'杭州',keywords:['hangzhou','hz']},{value:'chengdu',label:'成都',keywords:['chengdu','cd']}]
const options=ref(cities.slice(0,3)); const loading=ref(false); let requestId=0
const search=async(keyword:string)=>{const current=++requestId;loading.value=true;const result=await new Promise<typeof cities>((resolve)=>window.setTimeout(()=>{const query=keyword.trim().toLowerCase();resolve(query?cities.filter((city)=>city.label.includes(query)||city.keywords.some((item)=>item.includes(query))):cities.slice(0,3))},500));if(current!==requestId)return;options.value=result;loading.value=false}
</script>
<template><Select class="w-72" :options="options" default-value="beijing" searchable :loading="loading" placeholder="输入城市或拼音" @search="search"><template #empty>未找到城市</template></Select></template>
