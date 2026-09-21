<script setup lang="ts">
import Checkbox from '../../ui/checkbox/checkbox.vue'
const props = defineProps<{
  checked: boolean
  indeterminate?: boolean
  disabled?: boolean
  ariaLabel?: string
}>()
const emit = defineEmits<{ change: [value: boolean] }>()
function change(event: Event) {
  emit('change', (event.target as HTMLInputElement).checked)
}
</script>
<template>
  <Checkbox
    :checked="props.checked"
    :indeterminate="props.indeterminate"
    :disabled="props.disabled"
    :aria-label="props.ariaLabel"
    @change="change"
  />
</template>
