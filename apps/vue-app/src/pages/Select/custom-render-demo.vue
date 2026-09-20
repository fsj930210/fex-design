<script setup lang="ts">
import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
} from '@fex-design/vue/primitive/select'
import { frameworkOptions } from './data'
import Demo from './demo-section.vue'
</script>
<template>
  <Demo
    title="Custom option rendering"
    description="The option slot replaces content while selection and keyboard behavior remain intact."
    ><SelectRoot :items="frameworkOptions"
      ><SelectTrigger placeholder="请选择技术" /><SelectContent
        ><template #option="{ option }"
            ><div class="flex items-center justify-between gap-3">
              <span>{{ option.label }}</span
              ><span class="text-xs text-muted-foreground">{{ option.group }}</span>
            </div></template
        ></SelectContent
      ></SelectRoot
    ></Demo
  >
</template>
