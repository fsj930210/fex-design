<script setup lang="ts">
import { PlusIcon } from '@fex-design/vue/icon/plus'
import { Button, ButtonGroup } from '@fex-design/vue/ui/button'
</script>

<template>
  <div class="grid w-full gap-6 sm:grid-cols-2">
    <section
      v-for="direction in ['ltr', 'rtl'] as const"
      :key="direction"
      class="grid gap-3 rounded-lg border p-4"
    >
      <strong>{{ direction.toUpperCase() }}</strong>
      <div class="flex flex-wrap gap-3">
        <Button :dir="direction"
          ><template #icon><PlusIcon /></template>Start icon</Button
        ><Button :dir="direction" icon-placement="end"
          ><template #icon><PlusIcon /></template>End icon</Button
        >
      </div>
      <ButtonGroup :dir="direction"><Button>First</Button><Button>Middle</Button><Button>Last</Button></ButtonGroup>
    </section>
  </div>
</template>
