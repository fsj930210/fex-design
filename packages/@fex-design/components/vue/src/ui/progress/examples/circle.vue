<script setup lang="ts">
import { Progress } from '@fex-design/vue/ui/progress'

defineOptions({ name: 'ProgressCircleExample' })

</script>

<template>
  <div class="flex flex-wrap gap-4 items-center">
    <Progress variant="circle" :value="30" :size="96" :showInfo="true" />
    <Progress variant="circle" :value="70" :size="96" status="active" :showInfo="true" />
    <Progress variant="circle" :value="100" :size="96" status="success" :showInfo="true" />
    <Progress variant="circle" :value="50" :size="96" status="error" :showInfo="true" />
  </div>
</template>
