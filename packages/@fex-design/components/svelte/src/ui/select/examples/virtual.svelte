<script lang="ts">import Select from '@fex-design/svelte/ui/select'; const options=Array.from({length:1000},(_,index)=>({value:index,label:`项目 ${index+1}`}));</script>
<Select class="w-72" {options} searchable virtual={{itemHeight:32,overscan:4}} placeholder="搜索 1000 个项目" />
