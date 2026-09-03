<script setup lang="ts">
import { SkeletonBlock as Skeleton } from '@fex-design/vue/primitive/skeleton'
import { skeletonAnimationClassName } from '@fex-design/styles/skeleton'
import Card from '@fex-design/vue/ui/card'
defineProps<{ kind: 'basic' | 'avatar' | 'card' | 'text' | 'form' | 'table' | 'animation' }>()
</script>
<template>
  <Card v-if="kind === 'basic'" title="Basic" description="A single placeholder with a custom size."
    ><Skeleton class="h-5 max-w-sm" /></Card
  ><Card
    v-else-if="kind === 'avatar'"
    title="Avatar"
    description="Compose circular and text placeholders."
    ><div class="flex max-w-md items-center gap-3">
      <Skeleton class="size-12 rounded-full" />
      <div class="grid flex-1 gap-1.5">
        <Skeleton class="h-4 w-2/5" /><Skeleton class="h-4 w-4/5" />
      </div></div></Card
  ><Card
    v-else-if="kind === 'card'"
    title="Card"
    description="Preserve a media card layout while loading."
    ><div class="grid max-w-sm gap-2">
      <Skeleton class="aspect-video w-full" /><Skeleton class="h-5 w-3/5" /><Skeleton
        class="h-4 w-full"
      /><Skeleton class="h-4 w-4/5" /></div></Card
  ><Card
    v-else-if="kind === 'text'"
    title="Text"
    description="Use varied widths to suggest paragraph rhythm."
    ><div class="grid max-w-xl gap-1.5">
      <Skeleton class="h-4 w-full" /><Skeleton class="h-4 w-full" /><Skeleton
        class="h-4 w-2/3"
      /></div></Card
  ><Card v-else-if="kind === 'form'" title="Form" description="Match labels, controls and actions."
    ><div class="grid max-w-md gap-3">
      <div class="grid gap-1.5"><Skeleton class="h-4 w-24" /><Skeleton class="h-9 w-full" /></div>
      <div class="grid gap-1.5"><Skeleton class="h-4 w-32" /><Skeleton class="h-9 w-full" /></div>
      <Skeleton class="h-9 w-24" /></div></Card
  ><Card
    v-else-if="kind === 'table'"
    title="Table"
    description="Repeat stable row shapes for data loading."
    ><div class="grid max-w-2xl gap-2">
      <div class="grid grid-cols-3 gap-3 border-b pb-2">
        <Skeleton class="h-4 w-24" /><Skeleton class="h-4 w-20" /><Skeleton class="h-4 w-16" />
      </div>
      <div v-for="width in ['w-2/5', 'w-3/5', 'w-1/2']" :key="width" class="grid grid-cols-3 gap-3">
        <div class="flex items-center gap-1.5">
          <Skeleton class="size-8 rounded-full" /><Skeleton :class="['h-4', width]" />
        </div>
        <Skeleton class="h-4 w-2/3" /><Skeleton class="h-4 w-1/2" />
      </div></div></Card
  ><Card
    v-else
    title="Animation"
    description="Apply the built-in animation class when loading should be emphasized."
    ><div class="grid max-w-sm gap-2">
      <Skeleton :class="['h-5 w-full', skeletonAnimationClassName]" /><Skeleton
        :class="['h-5 w-11/12', skeletonAnimationClassName]"
      /><Skeleton :class="['h-5 w-4/5', skeletonAnimationClassName]" /><Skeleton
        :class="['h-5 w-2/3', skeletonAnimationClassName]"
      /><Skeleton :class="['h-5 w-1/2', skeletonAnimationClassName]" /></div
  ></Card>
</template>
