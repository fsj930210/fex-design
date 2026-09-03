<script setup lang="ts">
import { SkeletonAvatar, SkeletonBlock, SkeletonButton, SkeletonImage, SkeletonInput, SkeletonText } from '@fex-design/vue/primitive/skeleton'
</script>
<template><div class="grid gap-5"><div><b>SkeletonText</b><SkeletonText class="mt-2 w-64" /></div><div><b>SkeletonAvatar</b><div class="mt-2 flex gap-3"><SkeletonAvatar /><SkeletonAvatar shape="square" /></div></div><div><b>SkeletonButton</b><div class="mt-2 flex gap-3"><SkeletonButton /><SkeletonButton shape="round" /><SkeletonButton shape="square" /><SkeletonButton shape="circle" /></div></div><div><b>SkeletonInput</b><SkeletonInput class="mt-2" /></div><div><b>SkeletonBlock</b><SkeletonBlock class="mt-2 h-20 w-64" /></div><div><b>SkeletonImage</b><SkeletonImage class="mt-2" /></div></div></template>
