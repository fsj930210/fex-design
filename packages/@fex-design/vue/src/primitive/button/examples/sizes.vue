<script setup lang="ts">
import { Button, ButtonIcon } from '@fex-design/vue/primitive/button'
import { PlusIcon } from '@fex-design/vue/icon/plus'
import { buttonClassName } from '@fex-design/styles/button'
const sizeNames = [
  'xs',
  'sm',
  'default',
  'lg',
  'xl',
  'icon-xs',
  'icon-sm',
  'icon',
  'icon-lg',
  'icon-xl',
] as const
const sizes = sizeNames.map((size) => ({ size, className: buttonClassName({ size }) }))
</script>
<template>
  <div class="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4">
    <Button v-for="item in sizes" :key="item.size" :class="item.className" :aria-label="item.size">
      <ButtonIcon v-if="item.size.startsWith('icon')">
        <PlusIcon />
      </ButtonIcon>
      <template v-else>{{ item.size }}</template>
    </Button>
    <Button class="h-12 px-6 text-base">custom</Button>
    <Button class="size-12 px-0" aria-label="custom icon size"
      ><ButtonIcon><PlusIcon /></ButtonIcon
    ></Button>
  </div>
</template>
