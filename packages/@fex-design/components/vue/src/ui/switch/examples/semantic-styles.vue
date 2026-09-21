<script setup lang="ts">
import { Switch } from '@fex-design/vue/ui/switch'
</script>
<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <section class="grid gap-2">
      <span class="text-sm text-muted-foreground">rounded</span>
      <div class="flex flex-wrap items-center gap-3">
        <Switch
          shape="rounded"
          default-checked
          :class-names="{ root: 'ring-2', content: 'font-semibold', thumb: 'shadow-lg' }"
          :styles="{
            root: { backgroundColor: '#0f766e', color: '#fff' },
            content: { letterSpacing: '0.08em' },
            thumb: { backgroundColor: '#ccfbf1', color: '#0f766e' },
          }"
          aria-label="rounded 结构化样式"
          ><template #checkedContent>开启</template
          ><template #uncheckedContent>关闭</template></Switch
        >
      </div>
    </section>
    <section class="grid gap-2">
      <span class="text-sm text-muted-foreground">pill</span>
      <div class="flex flex-wrap items-center gap-3">
        <Switch
          shape="pill"
          default-checked
          :class-names="{ root: 'ring-2', content: 'font-semibold', thumb: 'shadow-lg' }"
          :styles="{
            root: { backgroundColor: '#0f766e', color: '#fff' },
            content: { letterSpacing: '0.08em' },
            thumb: { backgroundColor: '#ccfbf1', color: '#0f766e' },
          }"
          aria-label="pill 结构化样式"
          ><template #checkedContent>开启</template
          ><template #uncheckedContent>关闭</template></Switch
        >
      </div>
    </section>
  </div>
</template>
