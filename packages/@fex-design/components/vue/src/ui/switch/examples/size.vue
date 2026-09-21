<script setup lang="ts">
import { Switch } from '@fex-design/vue/ui/switch'
</script>
<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <section class="grid gap-2">
      <span class="text-sm text-muted-foreground">rounded</span>
      <div class="flex flex-wrap items-center gap-3">
        <Switch shape="rounded" size="sm" default-checked aria-label="rounded sm"></Switch
        ><Switch shape="rounded" size="md" default-checked aria-label="rounded md"></Switch
        ><Switch shape="rounded" size="lg" default-checked aria-label="rounded lg"></Switch>
      </div>
    </section>
    <section class="grid gap-2">
      <span class="text-sm text-muted-foreground">pill</span>
      <div class="flex flex-wrap items-center gap-3">
        <Switch shape="pill" size="sm" default-checked aria-label="pill sm"></Switch
        ><Switch shape="pill" size="md" default-checked aria-label="pill md"></Switch
        ><Switch shape="pill" size="lg" default-checked aria-label="pill lg"></Switch>
      </div>
    </section>
  </div>
</template>
