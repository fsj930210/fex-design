<script setup lang="ts">
import { Radio, RadioButton, RadioGroup } from '@fex-design/vue/primitive/radio'
</script>
<template>
  <div class="grid gap-3"><RadioGroup default-value="cn" orientation="horizontal" dir="ltr"><label class="inline-flex items-center gap-2"><Radio value="cn" />中文</label></RadioGroup><RadioGroup default-value="ar" orientation="horizontal" dir="rtl"><label class="inline-flex items-center gap-2"><Radio value="ar" />العربية</label></RadioGroup></div>
  <div class="grid gap-2"><RadioGroup default-value="cn" class="gap-0" dir="ltr"><RadioButton value="cn">中文按钮</RadioButton></RadioGroup><RadioGroup default-value="ar" class="gap-0" dir="rtl"><RadioButton value="ar">زر عربي</RadioButton></RadioGroup></div>
</template>
