<script setup lang="ts">
import { Select } from '@fex-design/vue/ui/select'
import { Checkbox } from '@fex-design/vue/ui/checkbox'

import { reactive } from 'vue'
import SearchLayout from './_search-layout.vue'
defineOptions({ name: 'LayoutExample' })
const alignOptions = [
  { value: 'start', label: '起始侧对齐' },
  { value: 'end', label: '末尾侧对齐' },
]
const widthOptions = [
  { value: '6rem', label: '6rem' },
  { value: '8rem', label: '8rem' },
  { value: '10rem', label: '10rem' },
]
const gapOptions = [
  { value: '0.375rem', label: '紧凑' },
  { value: '0.5rem', label: '默认' },
  { value: '0.75rem', label: '宽松' },
]
const options = reactive<{
  labelAlign: 'start' | 'end'
  labelWidth: string
  labelGap: string
  labelWrap: boolean
}>({ labelAlign: 'end', labelWidth: '8rem', labelGap: '0.5rem', labelWrap: true })
</script>
<template>
  <section class="mx-auto grid w-full max-w-2xl gap-5 p-5">
    <header class="grid gap-1">
      <h3 class="text-base font-semibold">表单布局与标签对齐</h3>
      <p class="text-sm text-muted-foreground">
        使用长短不同的标签比较布局。调整配置后直接提交，观察标签、控件、说明、错误和按钮的对齐。
      </p>
    </header>
    <div class="grid gap-3 rounded-md bg-muted-background p-3 text-sm sm:grid-cols-3">
      <div class="grid gap-1">
        <span>标签对齐</span
        ><Select
          :value="options.labelAlign"
          :options="alignOptions"
          :input-props="{ 'aria-label': '标签对齐' }"
          @change="(value) => (options.labelAlign = value === 'start' ? 'start' : 'end')"
        />
      </div>
      <div class="grid gap-1">
        <span>标签列宽</span
        ><Select
          :value="options.labelWidth"
          :options="widthOptions"
          :input-props="{ 'aria-label': '标签列宽' }"
          @change="(value) => (options.labelWidth = String(value))"
        />
      </div>
      <div class="grid gap-1">
        <span>标签间距</span
        ><Select
          :value="options.labelGap"
          :options="gapOptions"
          :input-props="{ 'aria-label': '标签间距' }"
          @change="(value) => (options.labelGap = String(value))"
        />
      </div>
      <Checkbox
        class="sm:col-span-3"
        :checked="options.labelWrap"
        @change="(event) => (options.labelWrap = (event.target as HTMLInputElement).checked)"
        >标签换行</Checkbox
      >
    </div>
    <SearchLayout layout="vertical" :options="options" />
    <SearchLayout layout="horizontal" :options="options" />
    <SearchLayout layout="inline" :options="options" />
  </section>
</template>
