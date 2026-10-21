import { defineComponent, type VNodeChild } from 'vue'
export interface DatePickerFooterActions {
  canConfirm: boolean
  close: () => void
  clear: () => void
  confirm: () => void
  cancel: () => void
  today: () => void
}
export type DatePickerFooterContent =
  | VNodeChild
  | ((actions: DatePickerFooterActions) => VNodeChild)
// This small render adapter accepts native vnode content; layout stays in the SFC.
export const FooterContent = defineComponent(
  (props: { content: DatePickerFooterContent; actions: DatePickerFooterActions }) => () =>
    typeof props.content === 'function' ? props.content(props.actions) : props.content,
  { name: 'FooterContent', props: ['content', 'actions'] },
)
