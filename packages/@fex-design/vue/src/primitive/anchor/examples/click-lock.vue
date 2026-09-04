<script setup lang="ts">
import { ref } from 'vue'
import { AnchorIndicator, AnchorItem, AnchorLink, AnchorList, AnchorRail, AnchorRoot } from '@fex-design/vue/primitive/anchor'
const container = ref<HTMLElement>()
const sections = [['first', '第一节'], ['second', '点击第二节'], ['third', '第三节']] as const
</script>
<template>
  <div class="grid w-full max-w-2xl gap-3">
    <p class="text-sm text-muted-foreground">点击“第二节”：容器会滚到底，但高亮仍保留在点击项。</p>
    <div ref="container" class="grid h-72 grid-cols-[10rem_1fr] gap-6 overflow-auto rounded-lg border p-4">
      <AnchorRoot :container="() => container!" class="sticky top-0 self-start">
        <AnchorRail><AnchorIndicator /></AnchorRail>
        <AnchorList><AnchorItem v-for="[key,title] in sections" :key="key" :value="key" :target="`#vue-click-lock-${key}`"><AnchorLink>{{ title }}</AnchorLink></AnchorItem></AnchorList>
      </AnchorRoot>
      <div class="grid gap-28 pb-16"><section v-for="[key,title] in sections" :id="`vue-click-lock-${key}`" :key="key"><h3 class="font-semibold">{{ title }}</h3></section></div>
    </div>
  </div>
</template>
