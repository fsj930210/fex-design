<script setup lang="ts">
import { ref } from 'vue'
import {
  AnchorIndicator,
  AnchorItem,
  AnchorLink,
  AnchorList,
  AnchorRail,
  AnchorRoot,
} from '@fex-design/vue/primitive/anchor'

const directions = ['ltr', 'rtl'] as const
const containers = ref<Partial<Record<(typeof directions)[number], HTMLElement>>>({})
</script>

<template>
  <div class="grid w-full gap-6 sm:grid-cols-2">
    <section v-for="direction in directions" :key="direction" :ref="element => containers[direction] = element as HTMLElement" :dir="direction" class="h-80 overflow-auto rounded-lg border">
      <div class="grid min-h-full grid-cols-[8rem_minmax(0,1fr)] gap-6 p-4">
        <div class="sticky top-4 self-start">
          <strong>{{ direction === 'rtl' ? 'RTL · مثال عربي' : 'LTR · 中文示例' }}</strong>
          <AnchorRoot :container="() => containers[direction]" class="mt-3">
            <AnchorRail><AnchorIndicator /></AnchorRail>
            <AnchorList>
              <AnchorItem :value="`${direction}-overview`" :target="`#vue-${direction}-overview`"><AnchorLink>{{ direction === 'rtl' ? 'نظرة عامة' : '概览' }}</AnchorLink></AnchorItem>
              <AnchorItem :value="`${direction}-usage`" :target="`#vue-${direction}-usage`">
                <AnchorLink>{{ direction === 'rtl' ? 'طريقة الاستخدام' : '使用方式' }}</AnchorLink>
                <AnchorList><AnchorItem :value="`${direction}-api`" :target="`#vue-${direction}-api`"><AnchorLink>{{ direction === 'rtl' ? 'واجهة البرمجة' : 'API' }}</AnchorLink></AnchorItem></AnchorList>
              </AnchorItem>
            </AnchorList>
          </AnchorRoot>
        </div>
        <div class="grid gap-32 pb-64">
          <section :id="`vue-${direction}-overview`">{{ direction === 'rtl' ? 'نظرة عامة' : '概览' }}</section>
          <section :id="`vue-${direction}-usage`">{{ direction === 'rtl' ? 'طريقة الاستخدام' : '使用方式' }}</section>
          <section :id="`vue-${direction}-api`">{{ direction === 'rtl' ? 'واجهة البرمجة' : 'API' }}</section>
        </div>
      </div>
    </section>
  </div>
</template>
