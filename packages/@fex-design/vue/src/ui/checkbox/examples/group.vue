<script setup lang="ts">
import { Checkbox, CheckboxGroup } from '@fex-design/vue/ui/checkbox'
</script>

<template>
  <div class="grid gap-3"><CheckboxGroup :default-value="['email']" :options="[{ label: '邮件', value: 'email' }, { label: '短信', value: 'sms' }, { label: '站内通知', value: 'push' }]" /></div>
</template>
