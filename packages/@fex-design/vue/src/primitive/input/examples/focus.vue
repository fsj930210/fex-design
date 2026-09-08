<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@fex-design/vue/primitive/button'
import { InputControl, InputRoot } from '@fex-design/vue/primitive/input'
const control = ref<HTMLInputElement>()
</script>
<template>
  <div class="grid w-full gap-3">
    <InputRoot default-value="通过 ref 控制"><InputControl ref="control" /></InputRoot>
    <div class="flex gap-2">
      <Button @click="control?.focus()">聚焦</Button><Button @click="control?.blur()">失焦</Button
      ><Button @click="control?.select()">全选</Button>
    </div>
  </div>
</template>
