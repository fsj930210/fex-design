<script setup lang="ts">
import { Switch } from '@fex-design/vue/ui/switch'
import { CheckIcon } from '@fex-design/vue/icons/check'
import { XIcon } from '@fex-design/vue/icons/x'
</script>
<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <section class="grid gap-2">
      <span class="text-sm text-muted-foreground">rounded</span>
      <div class="flex flex-wrap items-center gap-3">
        <Switch shape="rounded" default-checked aria-label="rounded 文字开关"
          ><template #checkedContent>开启</template
          ><template #uncheckedContent>关闭</template></Switch
        ><Switch shape="rounded" aria-label="rounded 文字开关"
          ><template #checkedContent>开启</template
          ><template #uncheckedContent>关闭</template></Switch
        ><Switch shape="rounded" aria-label="rounded 图标开关"
          ><template #checkedContent><CheckIcon /></template
          ><template #uncheckedContent><XIcon /></template
        ></Switch>
      </div>
    </section>
    <section class="grid gap-2">
      <span class="text-sm text-muted-foreground">pill</span>
      <div class="flex flex-wrap items-center gap-3">
        <Switch shape="pill" default-checked aria-label="pill 文字开关"
          ><template #checkedContent>开启</template
          ><template #uncheckedContent>关闭</template></Switch
        ><Switch shape="pill" aria-label="pill 文字开关"
          ><template #checkedContent>开启</template
          ><template #uncheckedContent>关闭</template></Switch
        ><Switch shape="pill" aria-label="pill 图标开关"
          ><template #checkedContent><CheckIcon /></template
          ><template #uncheckedContent><XIcon /></template
        ></Switch>
      </div>
    </section>
  </div>
</template>
