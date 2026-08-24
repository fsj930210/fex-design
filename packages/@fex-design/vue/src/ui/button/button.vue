<script setup lang="ts">
import { buttonClassName, buttonSpinnerClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { computed, useAttrs, useTemplateRef } from 'vue'
import { LoadingIcon } from '../../icon/loading'
import PrimitiveButton from '../../primitive/button/button.vue'
import ButtonIcon from '../../primitive/button/button-icon.vue'
import type { ButtonProps } from './button.types'

defineOptions({ name: 'Button', inheritAttrs: false })

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'default',
  iconPlacement: 'start',
  loading: false,
  disabled: false,
  type: 'button',
})

const attrs = useAttrs()
const primitiveButtonRef = useTemplateRef<{ ref: HTMLButtonElement | null }>('button')
const isDisabled = computed(() => props.disabled || props.loading)
const buttonRef = computed(() => primitiveButtonRef.value?.ref ?? null)

function getButtonAttrs() {
  return {
    ...attrs,
    class: cn(
      buttonClassName({
        variant: props.variant,
        size: props.size,
        effect: props.effect,
      }),
      attrs.class as string | undefined,
    ),
  }
}

defineExpose({
  ref: buttonRef,
})
</script>

<template>
  <PrimitiveButton
    v-bind="getButtonAttrs()"
    ref="button"
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :data-effect="effect"
    :data-loading="loading ? 'true' : undefined"
    :disabled="isDisabled"
    :type="type"
  >
    <ButtonIcon
      v-if="iconPlacement === 'start' && (loading || $slots.icon)"
      placement="start"
      :effect="effect"
    >
      <slot v-if="loading && $slots.loadingIndicator" name="loadingIndicator" />
      <LoadingIcon v-else-if="loading" :class="buttonSpinnerClassName" />
      <slot v-else name="icon" />
    </ButtonIcon>
    <slot />
    <ButtonIcon
      v-if="iconPlacement === 'end' && (loading || $slots.icon)"
      placement="end"
      :effect="effect"
    >
      <slot v-if="loading && $slots.loadingIndicator" name="loadingIndicator" />
      <LoadingIcon v-else-if="loading" :class="buttonSpinnerClassName" />
      <slot v-else name="icon" />
    </ButtonIcon>
  </PrimitiveButton>
</template>
