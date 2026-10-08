<script setup lang="ts">
import { Progress } from '@fex-design/vue/ui/progress'
defineOptions({ name: 'ProgressLinecapExample' })
</script>

<template>
<div class="grid w-full max-w-md gap-3">
    <div class="flex items-center gap-3"><span class="w-12 text-sm text-muted-foreground">直角</span>
      <Progress :value="50" class="flex-1" :styles="{ track: { borderRadius: '0px' }, range: { borderRadius: '0px' } }" />
    </div>
    <div class="flex items-center gap-3"><span class="w-12 text-sm text-muted-foreground">小圆角</span>
      <Progress :value="50" class="flex-1" :styles="{ track: { borderRadius: '2px' }, range: { borderRadius: '2px' } }" />
    </div>
    <div class="flex items-center gap-3"><span class="w-12 text-sm text-muted-foreground">胶囊</span>
      <Progress :value="50" class="flex-1" :styles="{ track: { borderRadius: '9999px' }, range: { borderRadius: '9999px' } }" />
    </div>
</div>
</template>
