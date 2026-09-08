<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@fex-design/vue/ui/input'
import { Button } from '@fex-design/vue/ui/button'
const value = ref('受控内容')
</script>
<template>
  <div class="grid w-full gap-3">
    <Input v-model="value" clearable /><Input default-value="非受控内容" clearable />
    <div class="flex gap-2">
      <Button @click="value = '外部设置'">外部设置</Button
      ><Button @click="value = ''">外部清空</Button>
    </div>
  </div>
</template>
