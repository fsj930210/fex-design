<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@fex-design/vue/ui/button'
import { Checkbox } from '@fex-design/vue/ui/checkbox'
const checked = ref(true)
function change(event: Event) {
  checked.value = (event.target as HTMLInputElement).checked
}
</script>
<template>
  <div class="grid gap-3">
    <div class="flex gap-2">
      <Button size="sm" @click="checked = true">选中</Button
      ><Button size="sm" @click="checked = false">取消选中</Button>
    </div>
    <Checkbox :checked="checked" @change="change">受控 Checkbox</Checkbox
    ><Checkbox default-checked>非受控：默认选中</Checkbox>
  </div>
</template>
