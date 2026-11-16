<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { dialogIconCloseClassName } from '@fex-design/components-styles/dialog'
import { useDialogContext } from './context'
import { ExpandIcon } from '../../icons/expand'
import { ShrinkIcon } from '../../icons/shrink'
import Button from '../button/button.vue'
const props = defineProps<{ class?: string; icon?: unknown }>()
const context = useDialogContext('DialogFullscreenToggle')
const mode = computed(() => context.fullscreen)
function onFullscreenChange() { context.onFullscreenChange?.(document.fullscreenElement !== null) }
onMounted(() => document.addEventListener('fullscreenchange', onFullscreenChange))
onBeforeUnmount(() => document.removeEventListener('fullscreenchange', onFullscreenChange))
async function toggle() {
  const setting = mode.value
  if (!setting) return
  const kind = setting === true ? 'viewport' : setting.mode
  if (kind === 'screen') {
    const element = document.getElementById(context.contentId)
    if (element && document.fullscreenElement !== element) { try { await element.requestFullscreen() } catch { context.fullscreenActive.value = true; context.onFullscreenChange?.(true); return } }
    else if (document.fullscreenElement) await document.exitFullscreen()
  }
  const next = kind === 'screen' ? document.fullscreenElement !== null : !context.fullscreenActive.value
  context.fullscreenActive.value = next
  context.onFullscreenChange?.(next)
}
</script>
<template><Button v-if="mode" type="button" data-slot="dialog-fullscreen-toggle" aria-label="Toggle fullscreen" :class="[dialogIconCloseClassName, 'right-12', props.class]" @click="toggle"><slot><component v-if="props.icon" :is="props.icon" /><ShrinkIcon v-else-if="context.fullscreenActive" aria-hidden="true" /><ExpandIcon v-else aria-hidden="true" /></slot></Button></template>
