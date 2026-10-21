<script setup lang="ts">
import { cn } from '@fex-design/utils'
import { RadioGroup, Radio, RadioButton } from '@fex-design/vue/primitive/radio'
import { radioItemClassName, radioLabelClassName } from '@fex-design/components-styles/radio'
defineOptions({ name: 'RadioSemanticStylesExample' })
</script>
<template>
  <div class="grid gap-4">
    <RadioGroup default-value="apple"
      ><div :class="cn(radioItemClassName, 'gap-3')">
        <Radio
          id="semantic-radio-apple"
          value="apple"
          class="ring-2 ring-orange-300 [--radio-checked-color:var(--success)]"
        ></Radio
        ><label
          for="semantic-radio-apple"
          :class="cn(radioLabelClassName, 'font-bold text-violet-700')"
          >苹果</label
        >
      </div></RadioGroup
    ><RadioGroup default-value="apple" class="gap-0"
      ><RadioButton value="apple" class="[--radio-button-checked-background:var(--success)]"
        >苹果</RadioButton
      ><RadioButton value="pear">梨按钮</RadioButton></RadioGroup
    >
  </div>
</template>
