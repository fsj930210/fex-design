import { defineComponent, type VNodeChild } from 'vue'
// A tiny vnode adapter renders data labels without converting nodes to strings.
export const MenuValue = defineComponent((props: { value?: VNodeChild }) => () => props.value, {
  name: 'MenuValue',
  props: ['value'],
})
