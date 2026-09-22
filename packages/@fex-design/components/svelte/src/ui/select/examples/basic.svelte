<script lang="ts">import Select from '@fex-design/svelte/ui/select'; const options=[{value:'react',label:'React'},{value:'vue',label:'Vue'}];</script>
<Select class="w-72" {options} defaultValue="react" placeholder="请选择框架" clearable />
