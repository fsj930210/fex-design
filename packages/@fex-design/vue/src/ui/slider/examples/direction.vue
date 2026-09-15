<script setup lang="ts">
import { Slider } from '@fex-design/vue/ui/slider'
</script>
<template>
  <div class="grid w-full max-w-xl gap-6">
    <section dir="ltr">
      <p>中文 LTR</p>
      <Slider :default-value="30" />
    </section>
    <section dir="rtl">
      <p>العربية RTL</p>
      <Slider :default-value="30" />
    </section>
    <section><p>Reverse</p><Slider :default-value="30" reverse /></section>
    <div class="flex h-48 gap-12">
      <section class="grid gap-2"><p>垂直</p><Slider orientation="vertical" :default-value="35" /></section><section class="grid gap-2"><p>垂直 Reverse</p><Slider
        orientation="vertical"
        reverse
        :default-value="35"
      /></section>
    </div>
  </div>
</template>
