<script setup lang="ts">
import { SwitchRoot, SwitchContent, SwitchThumb } from '@fex-design/vue/primitive/switch'

</script>
<template><div class="grid gap-6 sm:grid-cols-2"><section class="grid gap-2"><span class="text-sm text-muted-foreground">两种形状</span><div class="flex flex-wrap items-center gap-3"><SwitchRoot shape="rounded" default-checked aria-label="rounded"><SwitchThumb /></SwitchRoot><SwitchRoot shape="pill" default-checked aria-label="pill"><SwitchThumb /></SwitchRoot></div></section></div></template>
