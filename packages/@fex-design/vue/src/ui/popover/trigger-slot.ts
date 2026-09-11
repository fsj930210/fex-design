import { cloneVNode, Comment, defineComponent, Fragment, type VNode } from 'vue'

function elements(nodes: VNode[]): VNode[] {
  return nodes.flatMap((node) => node.type === Fragment
    ? elements(node.children as VNode[])
    : node.type === Comment ? [] : [node])
}

/** A tiny vnode adapter is necessary to bind the user's existing trigger DOM. */
export const TriggerSlot = defineComponent({
  name: 'TriggerSlot',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      const nodes = elements(slots.default?.() ?? [])
      if (nodes.length !== 1) throw new Error('Popover requires one trigger element')
      return cloneVNode(nodes[0]!, attrs, true)
    }
  },
})
