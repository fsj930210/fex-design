<script lang="ts">import Select from '@fex-design/svelte/ui/select'; const items=[{value:'react',label:'React'},{value:'vue',label:'Vue'}];</script>
<Select class="w-72" {items} defaultValue="react" placeholder="请选择框架" clearable />

