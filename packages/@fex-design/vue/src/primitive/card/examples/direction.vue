<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardExtra,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@fex-design/vue/primitive/card'
</script>
<template>
  <div class="grid w-full gap-6 sm:grid-cols-2">
    <Card v-for="dir in ['ltr', 'rtl']" :key="dir" :dir="dir"
      ><CardHeader
        ><CardTitle>{{ dir === 'ltr' ? 'LTR · 中文示例' : 'RTL · مثال عربي' }}</CardTitle
        ><CardDescription>Header 与 Footer 按逻辑方向排列。</CardDescription
        ><CardExtra
          ><button class="rounded-md border px-3 py-1.5 text-sm">{{ dir === 'ltr' ? '操作' : 'إجراء' }}</button></CardExtra
        ></CardHeader
      ><CardContent>内容区域保持可读顺序。</CardContent
      ><CardFooter
        ><button class="rounded-md bg-primary px-3 py-1.5 text-primary-foreground">
          保存
        </button></CardFooter
      ></Card
    >
  </div>
</template>
