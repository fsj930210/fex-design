<script setup lang="ts">
import { Radio, RadioButton, RadioGroup } from '@fex-design/vue/primitive/radio'
</script>
<template>
  <div class="grid gap-4"><section class="grid gap-2"><span>Radio</span><RadioGroup default-value="md" orientation="horizontal"><label><Radio value="sm" size="sm" /> sm · 14px</label><label><Radio value="md" size="md" /> md · 16px</label><label><Radio value="lg" size="lg" /> lg · 20px</label></RadioGroup></section><section class="grid gap-2"><span>RadioButton（复用全局 Button 高度）</span><RadioGroup default-value="md" orientation="horizontal" class="gap-0"><RadioButton value="sm" size="sm">sm · 24px</RadioButton><RadioButton value="md" size="md">md · 32px</RadioButton><RadioButton value="lg" size="lg">lg · 44px</RadioButton></RadioGroup></section></div>
</template>
