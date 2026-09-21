<script setup lang="ts">
import { Input, InputPassword, InputSearch } from '@fex-design/vue/ui/input'
const classNames = {
  root: 'border-violet-300 hover:border-violet-400 focus-within:border-violet-600 focus-within:ring-violet-600/20',
  control: 'font-medium',
  prefix: 'text-violet-500',
  clear: 'hover:text-violet-700',
}
</script>
<template>
  <div class="grid w-full gap-3">
    <Input default-value="structured" clearable :class-names="classNames"
      ><template #prefix>@</template></Input
    ><InputPassword
      default-value="secret"
      :class-names="{ action: 'text-violet-500' }"
    /><InputSearch
      default-value="主题"
      class="[--input-background:#faf5ff] [--input-border-color:#d8b4fe] [--input-ring-color:#9333ea]"
    />
  </div>
</template>
