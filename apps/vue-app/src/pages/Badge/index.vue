<script setup lang="ts">
import { Badge, BadgeGroup } from '@fex-design/vue/primitive/badge'
import Card from '@fex-design/vue/ui/card'

const colors = ['primary', 'info', 'success', 'warning', 'danger'] as const
const overflowItems = ['Design', 'Frontend', 'Backend', 'QA', 'Operations']
</script>

<template>
  <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
    <div class="mx-auto w-full max-w-5xl space-y-4">
      <header class="space-y-2">
        <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/"
          >Back home</RouterLink
        >
        <h1 class="text-2xl font-semibold text-foreground">Badge</h1>
        <p class="max-w-2xl text-sm leading-6 text-muted-foreground">
          Use badges for compact status, category, and count labels.
        </p>
      </header>
      <div class="grid gap-4">
        <Card title="Variants" description="Badge visual styles."
          ><div class="flex min-w-0 flex-wrap items-center gap-2">
            <Badge v-for="color in colors" :key="color" :color="color">{{ color }}</Badge>
          </div></Card
        ><Card title="Group" description="使用 maxCount 收起过多的标签。"
          ><BadgeGroup :max-count="3"
            ><Badge v-for="item in overflowItems" :key="item" color="info">{{
              item
            }}</Badge></BadgeGroup
          ></Card
        >
      </div>
    </div>
  </main>
</template>
