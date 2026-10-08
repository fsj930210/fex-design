<script setup lang="ts">
import { Progress } from '@fex-design/vue/ui/progress'

defineOptions({ name: 'ProgressGradientExample' })

</script>

<template>
  <div class="grid w-full max-w-md gap-4">
    <Progress :value="90" :color="{'from':'#1677ff','to':'#87d068'}" />
    <div class="flex items-center gap-6">
      <Progress
        variant="circle"
        :value="90"
        :size="96"
        :color="{'from':'#1677ff','to':'#87d068'}"
        :showInfo="true"
      />
      <Progress
        variant="dashboard"
        :value="90"
        :size="96"
        :color="{'from':'#1677ff','to':'#87d068'}"
        :showInfo="true"
      />
    </div>
  </div>
</template>
