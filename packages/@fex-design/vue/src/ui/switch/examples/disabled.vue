<script setup lang="ts">
import { Switch } from '@fex-design/vue/ui/switch'

</script>
<template><div class="grid gap-6 sm:grid-cols-2"><section class="grid gap-2"><span class="text-sm text-muted-foreground">rounded</span><div class="flex flex-wrap items-center gap-3"><Switch shape="rounded" disabled aria-label="rounded 禁用关闭"></Switch><Switch shape="rounded" disabled default-checked aria-label="rounded 禁用开启"></Switch></div></section><section class="grid gap-2"><span class="text-sm text-muted-foreground">pill</span><div class="flex flex-wrap items-center gap-3"><Switch shape="pill" disabled aria-label="pill 禁用关闭"></Switch><Switch shape="pill" disabled default-checked aria-label="pill 禁用开启"></Switch></div></section></div></template>
