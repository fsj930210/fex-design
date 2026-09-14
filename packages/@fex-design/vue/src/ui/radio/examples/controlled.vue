<script setup lang="ts">
import { Radio, RadioButton, RadioGroup, type RadioValue } from '@fex-design/vue/ui/radio'
import { Button } from '@fex-design/vue/ui/button'
import { ref } from 'vue'
const value = ref<RadioValue>('pear')
</script>
<template>
  <div class="grid gap-3"><div class="flex gap-2"><Button size="sm" @click="value = 'apple'">选择苹果</Button><Button size="sm" @click="value = 'pear'">选择梨</Button></div><RadioGroup :value="value" orientation="horizontal" @value-change="value = $event"><Radio value="apple">苹果</Radio><Radio value="pear">梨</Radio></RadioGroup><RadioGroup default-value="apple" orientation="horizontal"><Radio value="apple">非受控：苹果</Radio><Radio value="pear">非受控：梨</Radio></RadioGroup></div>
  <RadioGroup :value="value" orientation="horizontal" class="gap-0" @value-change="value = $event"><RadioButton value="apple">苹果按钮</RadioButton><RadioButton value="pear">梨按钮</RadioButton></RadioGroup>
</template>
