<script setup lang="ts">
import { Button, ButtonGroup } from '@fex-design/vue/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ButtonGroup>
      <Button :class="buttonClassName()">Left</Button>
      <Button :class="buttonClassName()">Center</Button>
      <Button :class="buttonClassName()">Right</Button>
    </ButtonGroup>
    <ButtonGroup orientation="vertical" :spacing="8">
      <Button :class="buttonClassName()">Top</Button>
      <Button :class="buttonClassName()">Bottom</Button>
    </ButtonGroup>
  </div>
</template>
