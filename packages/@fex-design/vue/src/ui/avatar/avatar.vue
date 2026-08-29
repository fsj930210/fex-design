<script setup lang="ts">
import PrimitiveAvatar from '../../primitive/avatar/avatar.vue'
import AvatarImage from '../../primitive/avatar/avatar-image.vue'
import AvatarFallback from '../../primitive/avatar/avatar-fallback.vue'
import type { AvatarStyleProps } from '@fex-design/styles/avatar'
import type { AvatarClassNames, AvatarStyles } from '@fex-design/core/avatar/types'
import type { StyleValue } from 'vue'
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<{ src?: string; alt?: string; srcSet?: string; fallback?: string; size?: AvatarStyleProps['size']; shape?: AvatarStyleProps['shape']; classNames?: AvatarClassNames; styles?: AvatarStyles<StyleValue> }>(), { alt: '', size: 'md', shape: 'circle' })
</script>
<template>
  <PrimitiveAvatar v-bind="$attrs" :size="props.size" :shape="props.shape" :class="[$attrs.class, props.classNames?.root]" :style="[$attrs.style, props.styles?.root]">
    <AvatarImage v-if="props.src" :src="props.src" :alt="props.alt" :srcset="props.srcSet" :class="props.classNames?.image" :style="props.styles?.image" />
    <AvatarFallback :class="props.classNames?.fallback" :style="props.styles?.fallback">{{ props.fallback }}<slot v-if="props.fallback === undefined" /></AvatarFallback>
  </PrimitiveAvatar>
</template>
