<script setup lang="ts">
import { InputSearch } from '@fex-design/vue/ui/input'
defineOptions({ name: 'InputCssVariablesExample' })
</script>
<template>
  <div class="grid w-full max-w-md gap-3">
    <p>Button: Before / After</p>
    <InputSearch
      class="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]"
      default-value="Design"
      :addon-before-button-props="{ color: 'info', variant: 'filled' }"
      :addon-after-button-props="{ color: 'success', variant: 'solid' }"
      ><template #addonBefore>Before</template><template #addonAfter>After</template></InputSearch
    >
  </div>
</template>
