<script lang="ts">import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/svelte/primitive/select';   const options=Array.from({length:1000},(_,index)=>({value:index,label:`项目 ${index+1}`}));</script>
<SelectRoot {options} showSearch virtual={{itemHeight:32,overscan:4}}><SelectTrigger class="w-72" placeholder="搜索项目"/><SelectContent/></SelectRoot>
