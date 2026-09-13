<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@fex-design/vue/primitive/button'
import { CheckboxControl, CheckboxIndicator, CheckboxLabel, CheckboxRoot } from '@fex-design/vue/primitive/checkbox'
const checked = ref(true)
function change(event: Event) { checked.value = (event.target as HTMLInputElement).checked }
</script>
<template><div class="grid gap-3"><div class="flex gap-2"><Button size="sm" @click="checked = true">选中</Button><Button size="sm" @click="checked = false">取消选中</Button></div><CheckboxRoot><CheckboxControl :checked="checked" @change="change" /><CheckboxIndicator /><CheckboxLabel>受控 Checkbox</CheckboxLabel></CheckboxRoot><CheckboxRoot><CheckboxControl default-checked /><CheckboxIndicator /><CheckboxLabel>非受控：默认选中</CheckboxLabel></CheckboxRoot></div></template>
