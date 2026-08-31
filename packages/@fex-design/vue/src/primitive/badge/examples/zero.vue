<script setup lang="ts">
import { ref } from 'vue'
import { Badge } from '@fex-design/vue/primitive/badge'
import { SwitchRoot, SwitchThumb } from '@fex-design/vue/primitive/switch'
const showZero = ref(false)
</script>
<template>
  <div class="flex items-center gap-6">
    <label class="flex items-center gap-2"
      ><SwitchRoot :checked="showZero" aria-label="显示 0" @checked-change="showZero = $event"
        ><template #default="{ checked }"><SwitchThumb :checked="checked" /></template></SwitchRoot
      ><span>显示 0</span></label
    ><span class="relative inline-flex"
      ><span class="block size-10 rounded bg-muted-background" /><Badge
        :count="0"
        :show-zero="showZero"
        class="absolute end-0 top-0 z-10 -translate-y-1/2 translate-x-1/2"
    /></span>
  </div>
</template>
