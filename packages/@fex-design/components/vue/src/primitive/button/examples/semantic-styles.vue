<script setup lang="ts">
import { Button, ButtonIcon } from '@fex-design/vue/primitive/button'
import { LoadingIcon } from '@fex-design/vue/icons/loading'
defineOptions({ name: 'ButtonSemanticStylesExample' })
</script>
<template>
  <div class="flex flex-wrap gap-4">
    <Button disabled data-loading="true"
      ><ButtonIcon data-icon="inline-start" class="rounded bg-violet-100 p-0.5"
        ><LoadingIcon class="size-[1em] animate-spin text-violet-700" /></ButtonIcon
      >Start</Button
    ><Button disabled data-loading="true"
      >End<ButtonIcon data-icon="inline-end" class="rounded bg-cyan-100 p-0.5"
        ><LoadingIcon class="size-[1em] animate-spin text-cyan-700" /></ButtonIcon
    ></Button>
  </div>
</template>
