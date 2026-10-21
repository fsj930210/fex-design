<script setup lang="ts">
import { Spinner } from '@fex-design/vue/primitive/spinner'

import { SwitchRoot, SwitchContent, SwitchThumb } from '@fex-design/vue/primitive/switch'
defineOptions({ name: 'SwitchSemanticStylesExample' })
</script>
<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <section class="grid gap-2">
      <span class="text-sm text-muted-foreground">rounded</span>
      <div class="flex flex-wrap items-center gap-3">
        <SwitchRoot
          shape="rounded"
          default-checked
          class="ring-2"
          :style="{ backgroundColor: '#0f766e', color: '#fff' }"
          aria-label="rounded 结构化样式"
          ><SwitchContent state="checked" class="font-semibold" :style="{ letterSpacing: '0.08em' }"
            >开启</SwitchContent
          ><SwitchContent
            state="unchecked"
            class="font-semibold"
            :style="{ letterSpacing: '0.08em' }"
            >关闭</SwitchContent
          ><SwitchThumb
            class="shadow-lg"
            :style="{ backgroundColor: '#ccfbf1', color: '#0f766e' }"
          ></SwitchThumb
        ></SwitchRoot>
      </div>
    </section>
    <section class="grid gap-2">
      <span class="text-sm text-muted-foreground">pill</span>
      <div class="flex flex-wrap items-center gap-3">
        <SwitchRoot
          shape="pill"
          default-checked
          class="ring-2"
          :style="{ backgroundColor: '#0f766e', color: '#fff' }"
          aria-label="pill 结构化样式"
          ><SwitchContent state="checked" class="font-semibold" :style="{ letterSpacing: '0.08em' }"
            >开启</SwitchContent
          ><SwitchContent
            state="unchecked"
            class="font-semibold"
            :style="{ letterSpacing: '0.08em' }"
            >关闭</SwitchContent
          ><SwitchThumb
            class="shadow-lg"
            :style="{ backgroundColor: '#ccfbf1', color: '#0f766e' }"
          ></SwitchThumb
        ></SwitchRoot>
      </div>
    </section>
    <section class="grid gap-2">
      <span class="text-sm text-muted-foreground">加载图标</span
      ><SwitchRoot
        loading
        default-checked
        class="[--switch-track-checked-background:#0f766e] [--switch-thumb-background:#ccfbf1]"
        aria-label="加载图标"
        ><SwitchThumb><Spinner class="text-violet-600" aria-hidden="true" /></SwitchThumb
      ></SwitchRoot>
    </section>
  </div>
</template>
