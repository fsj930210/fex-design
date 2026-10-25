<script setup lang="ts">
import { treeCheckDemoData } from './_data/tree-demo'

import StateDemo from './state-demo.vue'
</script>
<template>
  <div class="grid w-full gap-space-lg">
    <StateDemo
      :data="treeCheckDemoData"
      kind="checked"
      :controlled="false"
      :multiple="false"
      :strict="false"
    />
    <StateDemo
      :data="treeCheckDemoData"
      kind="checked"
      :controlled="true"
      :multiple="false"
      :strict="false"
    />
    <StateDemo
      :data="treeCheckDemoData"
      kind="checked"
      :controlled="false"
      :multiple="false"
      :strict="true"
    />
    <StateDemo
      :data="treeCheckDemoData"
      kind="checked"
      :controlled="true"
      :multiple="false"
      :strict="true"
    />
  </div>
</template>
