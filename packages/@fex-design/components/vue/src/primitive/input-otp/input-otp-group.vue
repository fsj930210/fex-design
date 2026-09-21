<script setup lang="ts">
import { inputOTPGroupClassName } from '@fex-design/components-styles/input-otp'
import { cn } from '@fex-design/utils'
import { useAttrs } from 'vue'
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>
<template>
  <div
    v-bind="attrs"
    data-slot="input-otp-group"
    :class="cn(inputOTPGroupClassName, attrs.class as string | undefined)"
  >
    <slot />
  </div>
</template>
