<template><div class="grid gap-3"><Progress :value="value"><ProgressTrack><ProgressRange /></ProgressTrack></Progress><button type="button" @click="value = Math.min(100, value + 10)">Increase</button></div></template>
<script setup lang="ts">import { ref } from 'vue'; import { Progress, ProgressTrack, ProgressRange } from '@fex-design/vue/primitive/progress'; const value = ref(40)</script>
