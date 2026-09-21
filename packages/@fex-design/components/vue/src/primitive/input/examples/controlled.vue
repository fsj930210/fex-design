<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@fex-design/vue/primitive/button'
import { InputClear, InputControl, InputRoot } from '@fex-design/vue/primitive/input'
const value = ref('受控内容')
</script>
<template>
  <div class="grid w-full gap-3">
    <InputRoot :value="value" @value-change="value = $event"
      ><InputControl /><InputClear /></InputRoot
    ><InputRoot default-value="非受控内容"><InputControl /><InputClear /></InputRoot>
    <div class="flex gap-2">
      <Button @click="value = '外部设置'">外部设置</Button
      ><Button @click="value = ''">外部清空</Button>
    </div>
  </div>
</template>
