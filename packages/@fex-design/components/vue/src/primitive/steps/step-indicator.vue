<script setup lang="ts">
import { stepIndicatorClassName } from '@fex-design/components-styles/steps'
import { cn } from '@fex-design/utils'
import { inject, useAttrs } from 'vue'
import { CheckIcon } from '@fex-design/vue/icons/check'
import { stepContextKey } from './context'
defineOptions({ inheritAttrs: false })
const context = inject<any>(stepContextKey)
if (!context) throw new Error('StepIndicator must be used inside Step.')
const attrs = useAttrs()
</script>
<template>
  <span v-bind="attrs" :class="cn(stepIndicatorClassName, attrs.class as string | undefined)"
    ><slot
      ><CheckIcon v-if="context.info.value.status === 'finish'" /><template v-else>{{
        context.position.value
      }}</template></slot
    ></span
  >
</template>
