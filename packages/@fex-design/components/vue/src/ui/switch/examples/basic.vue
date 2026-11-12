<script setup lang="ts">
const props = defineProps<{ invalid?: boolean }>()
import { Switch } from '@fex-design/vue/ui/switch'
</script>
<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <section class="grid gap-2">
      <span class="text-sm text-muted-foreground">rounded</span>
      <div class="flex flex-wrap items-center gap-3">
        <Switch
          :aria-invalid="props.invalid || undefined"
          shape="rounded"
          aria-label="rounded 关闭"
        ></Switch
        ><Switch
          :aria-invalid="props.invalid || undefined"
          shape="rounded"
          default-checked
          aria-label="rounded 开启"
        ></Switch>
      </div>
    </section>
    <section class="grid gap-2">
      <span class="text-sm text-muted-foreground">pill</span>
      <div class="flex flex-wrap items-center gap-3">
        <Switch
          :aria-invalid="props.invalid || undefined"
          shape="pill"
          aria-label="pill 关闭"
        ></Switch
        ><Switch
          :aria-invalid="props.invalid || undefined"
          shape="pill"
          default-checked
          aria-label="pill 开启"
        ></Switch>
      </div>
    </section>
  </div>
</template>
