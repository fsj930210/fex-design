<script setup lang="ts">
import { ref } from 'vue'
import { Badge } from '@fex-design/vue/ui/badge'
import { SwitchRoot, SwitchThumb } from '@fex-design/vue/primitive/switch'
const showZero = ref(false)
</script>
<template>
  <div class="flex items-center gap-6">
    <label class="flex items-center gap-2"
      ><SwitchRoot :checked="showZero" aria-label="显示 0" @checked-change="showZero = $event"
        ><template #default="{ checked }"><SwitchThumb :checked="checked" /></template></SwitchRoot
      ><span>显示 0</span></label
    ><Badge :count="0" :show-zero="showZero"
      ><span class="block size-10 rounded bg-muted-background"
    /></Badge>
  </div>
</template>
