<script setup lang="ts">
import { PlusIcon } from '@fex-design/vue/icon/plus'
import { Button } from '@fex-design/vue/ui/button'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button>
      <template #icon> <PlusIcon /> </template>Create</Button
    >
    <Button icon-placement="end">
      <template #icon> <PlusIcon /> </template>Continue</Button
    >
    <Button size="icon" aria-label="Create">
      <template #icon>
        <PlusIcon />
      </template>
    </Button>
  </div>
</template>
