<script setup lang="ts">
import { provide } from 'vue'
import type { AnyFieldApi } from '@tanstack/vue-form'
import { fieldKey } from './context'
const props = defineProps<{
  field: AnyFieldApi
  association: ReturnType<
    typeof import('@fex-design/core/form/field-association').createFormFieldAssociation
  >
}>()
provide(fieldKey, props)
</script>
<template><slot /></template>
