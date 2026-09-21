<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  CheckboxControl,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
} from '@fex-design/vue/primitive/checkbox'
const values = ['read', 'write', 'publish']
const selected = ref(['read'])
const all = computed(() => selected.value.length === values.length)
const partial = computed(() => selected.value.length > 0 && !all.value)
function toggleAll(event: Event) {
  selected.value = (event.target as HTMLInputElement).checked ? [...values] : []
}
</script>
<template>
  <div class="grid gap-3">
    <CheckboxRoot
      ><CheckboxControl
        :checked="all"
        :indeterminate="partial"
        @change="toggleAll"
      /><CheckboxIndicator /><CheckboxLabel>全部权限</CheckboxLabel></CheckboxRoot
    ><CheckboxGroup :value="selected" @change="selected = $event"
      ><CheckboxRoot
        ><CheckboxControl value="read" /><CheckboxIndicator /><CheckboxLabel
          >读取</CheckboxLabel
        ></CheckboxRoot
      ><CheckboxRoot
        ><CheckboxControl value="write" /><CheckboxIndicator /><CheckboxLabel
          >编辑</CheckboxLabel
        ></CheckboxRoot
      ><CheckboxRoot
        ><CheckboxControl value="publish" /><CheckboxIndicator /><CheckboxLabel
          >发布</CheckboxLabel
        ></CheckboxRoot
      ></CheckboxGroup
    >
  </div>
</template>
