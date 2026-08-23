<script setup lang="ts">
import { ref } from 'vue'
import { InputNumber } from '@fex-design/vue/primitive/input-number'
import Card from '@fex-design/vue/ui/card'
const value = ref<number>()
</script>
<template>
  <Card
    title="Basic"
    description="Controlled and uncontrolled numeric values use the default icon actions."
    ><div class="grid gap-3 md:grid-cols-2">
      <InputNumber :default-value="3" aria-label="Uncontrolled number" />
      <div class="space-y-1.5">
        <InputNumber
          :value="value"
          aria-label="Controlled number"
          @change="(_, next) => (value = next)"
        />
        <p class="text-sm text-muted-foreground">Value: {{ value ?? 'empty' }}</p>
      </div>
    </div></Card
  >
</template>
