<script setup lang="ts">
import { Button, ButtonGroup } from '@fex-design/vue/primitive/button'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ButtonGroup>
      <Button>One</Button>
      <Button>Two</Button>
    </ButtonGroup>
    <ButtonGroup orientation="vertical" :spacing="8">
      <Button>Top</Button>
      <Button>Bottom</Button>
    </ButtonGroup>
  </div>
</template>
