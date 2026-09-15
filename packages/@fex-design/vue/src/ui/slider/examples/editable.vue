<script setup lang="ts">
import { Slider } from '@fex-design/vue/ui/slider'
import { ref } from 'vue'
const values = ref([20, 50, 80])
</script>
<template>
  <div class="grid w-full max-w-xl gap-3">
    <Slider
      :value="values"
      editable
      :min-count="2"
      :max-count="5"
      @change="(next) => (values = next)"
    />
    <p>当前节点：{{ values.join('、') }}</p>
  </div>
</template>
