<script lang="ts">import SelectRoot from '@fex-design/svelte/primitive/select'; import SelectTrigger from '@fex-design/svelte/primitive/select-trigger'; import SelectContent from '@fex-design/svelte/primitive/select-content'; const items=Array.from({length:1000},(_,index)=>({value:index,label:`项目 ${index+1}`}));</script>
<SelectRoot {items} showSearch virtual={{itemHeight:32,overscan:4}}><SelectTrigger class="w-72" placeholder="搜索项目"/><SelectContent/></SelectRoot>

