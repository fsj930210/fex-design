<script setup lang="ts">
import { PlusIcon } from '@fex-design/vue/icon/plus'
import { Button, ButtonIcon } from '@fex-design/vue/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <div dir="ltr">
      <Button
        variant="solid"
        color="danger"
        :class="buttonClassName({ size: 'lg', effect: 'press' })"
        data-effect="press"
        ><ButtonIcon><PlusIcon /></ButtonIcon>Delete</Button
      >
    </div>
    <div dir="rtl">
      <Button
        variant="outlined"
        :class="buttonClassName({ effect: 'expand-icon' })"
        data-effect="expand-icon"
        >متابعة<ButtonIcon placement="end"><PlusIcon /></ButtonIcon
      ></Button>
    </div>
  </div>
</template>



