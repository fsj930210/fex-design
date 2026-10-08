<script setup lang="ts">
import { Progress } from '@fex-design/vue/ui/progress'

defineOptions({ name: 'ProgressStructuredExample' })

</script>

<template>
  <div class="grid w-full max-w-xl gap-6">
    <Progress
      :value="72"
      :thickness="12"
      label="上传文件"
      infoPlacement="top"
      class="w-full"
      :classNames="{'label':'font-semibold','info':'text-violet-600','track':'rounded-md','range':'rounded-md'}"
      :styles="{'range':{'background':'linear-gradient(90deg, #6366f1, #a855f7)'}}"
    />
    <div class="flex items-center gap-6">
      <Progress
        variant="circle"
        :value="72"
        :size="96"
        :showInfo="true"
        :classNames="{'root':'rounded-full bg-muted/30 p-2','range':'text-violet-600'}"
      />
      <Progress
        variant="dashboard"
        :value="72"
        :size="96"
        :showInfo="true"
        :gapDegree="90"
        :classNames="{'root':'rounded-full bg-muted/30 p-2','range':'text-violet-600'}"
      />
    </div>
  </div>
</template>
