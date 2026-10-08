import type { MentionsKey } from '@fex-design/core/mentions/types'
import { useMentionsContext } from './mentions-context'

export function useMentions() {
  const context = useMentionsContext('useMentions')
  return {
    value: () => context.snapshot().value,
    open: () => context.snapshot().open,
    query: () => context.snapshot().query,
    prefix: () => context.snapshot().query?.prefix ?? null,
    text: () => context.snapshot().query?.text ?? '',
    activeKey: () => context.snapshot().activeKey,
    activeId: () =>
      context.snapshot().activeKey === undefined
        ? undefined
        : context.listId + '-' + context.snapshot().activeKey,
    disabled: context.disabled,
    readOnly: context.readOnly,
    invalid: context.invalid,
    required: context.required,
    close: () => context.controller.setOpen(false, 'programmatic'),
    selectItem: (key: MentionsKey) => context.controller.selectItem(key),
  }
}
