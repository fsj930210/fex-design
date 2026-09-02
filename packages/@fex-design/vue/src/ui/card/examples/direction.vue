<script setup lang="ts">
import Card from '@fex-design/vue/ui/card'

const directions = ['ltr', 'rtl'] as const
</script>

<template>
  <div class="grid w-full gap-6 sm:grid-cols-2">
    <Card v-for="dir in directions" :key="dir" :dir="dir">
      <template #title>{{ dir === 'ltr' ? 'LTR · 中文示例' : 'RTL · مثال عربي' }}</template>
      <template #description>{{
        dir === 'ltr'
          ? '标题与操作按逻辑方向排列。'
          : 'يُرتَّب العنوان والإجراء حسب الاتجاه المنطقي.'
      }}</template>
      {{
        dir === 'ltr'
          ? '内容区域保持中文阅读顺序。'
          : 'يحافظ المحتوى على ترتيب القراءة العربية.'
      }}
      <template #extra
        ><button class="rounded-md border px-3 py-1.5 text-sm">{{ dir === 'ltr' ? '操作' : 'إجراء' }}</button></template
      >
      <template #footer
        ><button class="rounded-md bg-primary px-3 py-1.5 text-primary-foreground">
          {{ dir === 'ltr' ? '保存' : 'حفظ' }}
        </button></template
      >
    </Card>
  </div>
</template>
