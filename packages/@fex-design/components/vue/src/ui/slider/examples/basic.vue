<script setup lang="ts">
import { Slider } from '@fex-design/vue/ui/slider'
import { computed, ref } from 'vue'
const value = ref(42)
const ended = ref(42)
</script>
<template>
  <div class="grid w-full max-w-xl gap-4">
    <Slider :value="value" @change="(next) => (value = next)" @end="(next) => (ended = next)" />
    <p>当前值：{{ value }}；结束值：{{ ended }}</p>
    <Slider :default-value="60" :keyboard="false" />
  </div>
</template>
