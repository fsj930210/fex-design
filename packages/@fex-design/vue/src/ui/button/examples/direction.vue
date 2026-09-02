<script setup lang="ts">
import { PlusIcon } from '@fex-design/vue/icon/plus'
import { Button, ButtonGroup } from '@fex-design/vue/ui/button'
</script>

<template>
  <div class="grid w-full gap-6 sm:grid-cols-2">
    <section
      v-for="direction in ['ltr', 'rtl'] as const"
      :key="direction"
      class="grid gap-3 rounded-lg border p-4"
    >
      <strong>{{ direction === 'ltr' ? 'LTR · 中文示例' : 'RTL · مثال عربي' }}</strong>
      <div class="flex flex-wrap gap-3">
        <Button :dir="direction"
          ><template #icon><PlusIcon /></template>{{ direction === 'ltr' ? '前置图标' : 'أيقونة البداية' }}</Button
        ><Button :dir="direction" icon-placement="end"
          ><template #icon><PlusIcon /></template>{{ direction === 'ltr' ? '后置图标' : 'أيقونة النهاية' }}</Button
        >
      </div>
      <ButtonGroup :dir="direction"
        ><Button>{{ direction === 'ltr' ? '第一项' : 'الأول' }}</Button><Button>{{ direction === 'ltr' ? '中间项' : 'الأوسط' }}</Button><Button>{{ direction === 'ltr' ? '最后一项' : 'الأخير' }}</Button></ButtonGroup
      >
    </section>
  </div>
</template>
