<script setup lang="ts">
import { ref } from 'vue'
import { Anchor } from '@fex-design/vue/ui/anchor'
const container = ref<HTMLElement>()
const items = [{key:'first',title:'第一节',target:'#vue-ui-click-lock-first'},{key:'second',title:'点击第二节',target:'#vue-ui-click-lock-second'},{key:'third',title:'第三节',target:'#vue-ui-click-lock-third'}]
</script>
<template>
  <div class="grid w-full max-w-2xl gap-3">
    <p class="text-sm text-muted-foreground">点击“第二节”：容器会滚到底，但高亮仍保留在点击项。</p>
    <div ref="container" class="grid h-72 grid-cols-[10rem_1fr] gap-6 overflow-auto rounded-lg border p-4">
      <Anchor :items="items" :container="() => container!" class="sticky top-0 self-start" />
      <div class="grid gap-28 pb-16"><section v-for="item in items" :id="`vue-ui-click-lock-${item.key}`" :key="item.key"><h3 class="font-semibold">{{ item.title }}</h3></section></div>
    </div>
  </div>
</template>
