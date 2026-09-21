<script lang="ts">import Select from '@fex-design/svelte/ui/select'; const items=[{profileId:1,displayName:'张三'},{profileId:2,displayName:'李四',disabled:true}];</script>
<Select class="w-72" {items} fieldNames={{value:'profileId',label:'displayName'}} placeholder="请选择用户" />

