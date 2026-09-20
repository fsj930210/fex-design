<script lang="ts">import SelectRoot from '@fex-design/svelte/primitive/select'; import SelectTrigger from '@fex-design/svelte/primitive/select-trigger'; import SelectContent from '@fex-design/svelte/primitive/select-content'; const items=[{value:'react',label:'React'},{value:'vue',label:'Vue'}];</script>
<SelectRoot {items} defaultValue="react"><SelectTrigger class="w-72" placeholder="请选择框架"/><SelectContent/></SelectRoot>

