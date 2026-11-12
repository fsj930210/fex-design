<script setup lang="ts" generic="TSelected">
import { useStore, type AnyFormState } from '@tanstack/vue-form'
import { useRootContext } from '../../primitive/form/context'
defineOptions({ name: 'FormSubscribe' })
const props = defineProps<{ selector: (state: AnyFormState) => TSelected }>()
const selected = useStore(useRootContext().form.store, (state) => props.selector(state))
</script>
<template><slot :value="selected" /></template>
