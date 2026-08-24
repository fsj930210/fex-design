<script setup lang="ts">
import { PlusIcon } from '@fex-design/vue/icon/plus'
import { Button, ButtonGroup, ButtonIcon } from '@fex-design/vue/primitive/button'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ButtonGroup :spacing="8">
      <Button>
        <ButtonIcon placement="start"> <PlusIcon /> </ButtonIcon>Add</Button
      >
      <Button aria-pressed="true">Selected</Button>
      <Button disabled>Disabled</Button>
    </ButtonGroup>
  </div>
</template>
