<script setup lang="ts">
import { Alert, AlertIcon, AlertTitle } from '@fex-design/vue/primitive/alert'
import { InfoIcon } from '@fex-design/vue/icon/info'
const variants = [{ value: 'filled', title: 'Filled Alert' }, { value: 'outlined', title: 'Outlined Alert' }, { value: 'solid', title: 'Solid Alert' }] as const
</script>

<template>
  <div class="grid w-full gap-3">
    <Alert v-for="item in variants" :key="item.value" :variant="item.value">
      <AlertIcon><InfoIcon /></AlertIcon><AlertTitle>{{ item.title }}</AlertTitle>
    </Alert>
  </div>
</template>
