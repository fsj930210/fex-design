<script setup lang="ts">
import type { AnchorClassNames, AnchorStyles } from '@fex-design/core/anchor/types'
import type { StyleValue } from 'vue'
import { AnchorItem, AnchorLink, AnchorList } from '../../primitive/anchor/anchor'
import type { AnchorItem as AnchorItemData } from './anchor.types'
defineOptions({ name: 'AnchorItems' })
defineProps<{ items: readonly AnchorItemData<string>[]; classNames: AnchorClassNames; styles: AnchorStyles<StyleValue> }>()
const emit = defineEmits<{ itemClick: [event: MouseEvent, item: AnchorItemData<string>] }>()
const forwardItemClick = (event: MouseEvent, item: AnchorItemData<string>) => emit('itemClick', event, item)
</script>
<template><AnchorList :class="classNames.list" :style="styles.list"><AnchorItem v-for="item in items" :key="item.key" :value="item.key" :target="item.target" :target-offset="item.targetOffset" :class="classNames.item" :style="styles.item"><AnchorLink :class="classNames.link" :style="styles.link" @click="emit('itemClick', $event, item)">{{ item.title }}</AnchorLink><AnchorItems v-if="item.children?.length" :items="item.children" :class-names="classNames" :styles="styles" @item-click="forwardItemClick" /></AnchorItem></AnchorList></template>
