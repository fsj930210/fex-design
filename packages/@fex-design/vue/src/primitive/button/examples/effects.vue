<script setup lang="ts">
import { PlusIcon } from '@fex-design/vue/icon/plus'
import { Button, ButtonIcon } from '@fex-design/vue/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'
const effectNames = [
  'expand-icon',
  'ring-hover',
  'shine-hover',
  'gooey-start',
  'gooey-end',
  'underline',
  'hover-underline',
  'press',
] as const
const effects = effectNames.map((effect) => ({ effect, className: buttonClassName({ effect }) }))
</script>
<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button
      v-for="item in effects"
      :key="item.effect"
      :class="item.className"
      :data-effect="item.effect"
    >
      <ButtonIcon><PlusIcon /></ButtonIcon>{{ item.effect }}
    </Button>
  </div>
</template>
