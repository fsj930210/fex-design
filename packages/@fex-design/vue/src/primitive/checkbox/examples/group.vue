<script setup lang="ts">
import { CheckboxControl, CheckboxGroup, CheckboxIndicator, CheckboxLabel, CheckboxRoot } from '@fex-design/vue/primitive/checkbox'
</script>

<template>
  <div class="grid gap-3"><CheckboxGroup :default-value="['email']"><CheckboxRoot value="email"><CheckboxControl /><CheckboxIndicator /><CheckboxLabel>邮件</CheckboxLabel></CheckboxRoot><CheckboxRoot value="sms"><CheckboxControl /><CheckboxIndicator /><CheckboxLabel>短信</CheckboxLabel></CheckboxRoot><CheckboxRoot value="push"><CheckboxControl /><CheckboxIndicator /><CheckboxLabel>站内通知</CheckboxLabel></CheckboxRoot></CheckboxGroup></div>
</template>
