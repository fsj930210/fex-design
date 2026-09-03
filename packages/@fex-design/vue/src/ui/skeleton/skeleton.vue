<script setup lang="ts">
import type { SkeletonClassNames, SkeletonOptions, SkeletonStyles, SkeletonWidth } from '@fex-design/core/skeleton/types'
import { skeletonAvatarAreaClassName, skeletonBodyClassName, skeletonParagraphClassName, skeletonRootClassName, skeletonTitleClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import type { StyleValue } from 'vue'
import { computed, useAttrs } from 'vue'
import SkeletonAvatar from '../../primitive/skeleton/skeleton-avatar.vue'
import SkeletonText from '../../primitive/skeleton/skeleton-text.vue'
defineOptions({ name: 'Skeleton', inheritAttrs: false })
const props = withDefaults(defineProps<SkeletonOptions & { classNames?: SkeletonClassNames; styles?: SkeletonStyles<StyleValue> }>(), { avatar: false, paragraph: true, title: true })
const attrs = useAttrs()
const avatarOptions = computed(() => typeof props.avatar === 'object' ? props.avatar : {})
const titleOptions = computed(() => typeof props.title === 'object' ? props.title : {})
const paragraphOptions = computed(() => typeof props.paragraph === 'object' ? props.paragraph : {})
const rows = computed(() => Math.max(0, Math.floor(paragraphOptions.value.rows ?? 3)))
const widthStyle = (width: SkeletonWidth | undefined): StyleValue | undefined => width === undefined ? undefined : { width: typeof width === 'number' ? `${width}px` : width }
const rowWidth = (index: number) => Array.isArray(paragraphOptions.value.width) ? paragraphOptions.value.width[index] : index === rows.value - 1 ? paragraphOptions.value.width : undefined
</script>
<template>
  <slot v-if="props.loading === false" />
  <slot v-else-if="$slots.placeholder" name="placeholder" />
  <div v-else v-bind="attrs" aria-hidden="true" data-slot="skeleton-root" :class="cn(skeletonRootClassName, props.classNames?.root, attrs.class as string | undefined)" :style="[props.styles?.root, attrs.style]">
    <div v-if="props.avatar" :class="skeletonAvatarAreaClassName"><SkeletonAvatar :animation="avatarOptions.animation ?? props.animation" :shape="avatarOptions.shape" :size="avatarOptions.size" :class="props.classNames?.avatar" :style="props.styles?.avatar" /></div>
    <div :class="skeletonBodyClassName">
      <SkeletonText v-if="props.title" :animation="props.animation" :round="props.round" :class="cn(skeletonTitleClassName, props.classNames?.title)" :style="[widthStyle(titleOptions.width), props.styles?.title]" />
      <div v-if="props.paragraph && rows > 0" :class="skeletonParagraphClassName"><SkeletonText v-for="index in rows" :key="index" :animation="props.animation" :round="props.round" :class="props.classNames?.paragraph" :style="[widthStyle(rowWidth(index - 1)), props.styles?.paragraph]" /></div>
    </div>
  </div>
</template>
