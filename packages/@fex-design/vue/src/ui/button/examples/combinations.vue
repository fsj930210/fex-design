<script setup lang="ts">
import { PlusIcon } from '@fex-design/vue/icon/plus'
import { Button } from '@fex-design/vue/ui/button'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <div dir="ltr">
      <Button variant="destructive" size="lg" effect="press">
        <template #icon> <PlusIcon /> </template>Delete</Button
      >
    </div>
    <div dir="rtl">
      <Button variant="outline" effect="expand-icon" icon-placement="end">
        <template #icon> <PlusIcon /> </template>متابعة</Button
      >
    </div>
  </div>
</template>
