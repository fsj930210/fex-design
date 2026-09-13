<script setup lang="ts">
import { computed, ref } from 'vue'
import { Checkbox, CheckboxGroup } from '@fex-design/vue/ui/checkbox'
const values = ['read','write','publish']; const selected = ref(['read']); const all = computed(() => selected.value.length === values.length); const partial = computed(() => selected.value.length > 0 && !all.value)
function toggleAll(event: Event) { selected.value = (event.target as HTMLInputElement).checked ? [...values] : [] }
</script>
<template><div class="grid gap-3"><Checkbox :checked="all" :indeterminate="partial" @change="toggleAll">全部权限</Checkbox><CheckboxGroup :value="selected" @change="selected = $event"><Checkbox value="read">读取</Checkbox><Checkbox value="write">编辑</Checkbox><Checkbox value="publish">发布</Checkbox></CheckboxGroup></div></template>
