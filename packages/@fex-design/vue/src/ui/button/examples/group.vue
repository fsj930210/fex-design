<script setup lang="ts">
import { Button, ButtonGroup } from '@fex-design/vue/ui/button'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ButtonGroup>
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>
    <ButtonGroup orientation="vertical" :spacing="8">
      <Button>Top</Button>
      <Button>Bottom</Button>
    </ButtonGroup>
  </div>
</template>
