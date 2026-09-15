<script setup lang="ts">
import {
  CheckboxControl,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
} from '@fex-design/vue/primitive/checkbox'
</script>

<template>
  <div class="grid gap-3">
    <CheckboxRoot
      ><CheckboxControl default-checked /><CheckboxIndicator /><CheckboxLabel
        >接收消息通知</CheckboxLabel
      ></CheckboxRoot
    >
    <div dir="rtl">
      <CheckboxRoot
        ><CheckboxControl default-checked /><CheckboxIndicator /><CheckboxLabel
          >تلقي إشعارات الرسائل</CheckboxLabel
        ></CheckboxRoot
      >
    </div>
  </div>
</template>
