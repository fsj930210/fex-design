<script setup lang="ts">
import { Button } from '@fex-design/vue/ui/button'
import { PlusIcon } from '@fex-design/vue/icon/plus'
</script>

<template>
  <div class="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4">
    <Button size="xs">xs</Button>
    <Button size="sm">sm</Button>
    <Button size="default">default</Button>
    <Button size="lg">lg</Button>
    <Button size="xl">xl</Button>
    <Button size="icon-xs" aria-label="icon-xs"><PlusIcon /></Button>
    <Button size="icon-sm" aria-label="icon-sm"><PlusIcon /></Button>
    <Button size="icon" aria-label="icon"><PlusIcon /></Button>
    <Button size="icon-lg" aria-label="icon-lg"><PlusIcon /></Button>
    <Button size="icon-xl" aria-label="icon-xl"><PlusIcon /></Button>
    <Button class="h-12 px-6 text-base">custom</Button>
    <Button class="size-12 px-0" aria-label="custom icon size"><PlusIcon /></Button>
  </div>
</template>
