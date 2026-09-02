<script setup lang="ts">
import { Alert, AlertDescription, AlertIcon } from '@fex-design/vue/primitive/alert'
import { CircleWarningIcon } from '@fex-design/vue/icon/circle-warning'
</script>
<template><Alert type="warning" class="overflow-hidden"><AlertIcon><CircleWarningIcon /></AlertIcon><AlertDescription class="alert-marquee overflow-hidden"><span class="alert-marquee-track flex w-max"><span class="pe-12">系统将在今晚 22:00 至 23:00 进行维护，<a href="#notice">查看公告详情</a></span><span aria-hidden="true" class="alert-marquee-copy pe-12">系统将在今晚 22:00 至 23:00 进行维护，查看公告详情</span></span></AlertDescription></Alert></template>
<style scoped>@keyframes marquee{to{transform:translateX(-50%)}}.alert-marquee-track{animation:marquee 18s linear infinite}.alert-marquee:hover .alert-marquee-track,.alert-marquee:focus-within .alert-marquee-track{animation-play-state:paused}@media(prefers-reduced-motion:reduce){.alert-marquee-track{animation:none}.alert-marquee-copy{display:none}}[dir=rtl] .alert-marquee-track{animation-direction:reverse}</style>
