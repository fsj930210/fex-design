import { autoCompleteOptionClassName } from '@fex-design/components-styles/auto-complete'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { useAutoComplete } from './context'

export interface AutoCompleteOptionProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  itemKey: string | number
}

export function AutoCompleteOption(props: AutoCompleteOptionProps) {
  const autoComplete = useAutoComplete('AutoCompleteOption')
  const [local, rest] = splitProps(props, [
    'itemKey',
    'children',
    'class',
    'onPointerMove',
    'onPointerDown',
    'onClick',
  ])
  const entry = () => autoComplete.items().find((item) => item.key === local.itemKey)
  const active = () => autoComplete.snapshot().activeKey === local.itemKey
  return (
    <div
      {...rest}
      id={`${autoComplete.listId}-${local.itemKey}`}
      role="option"
      aria-selected={active()}
      aria-disabled={entry()?.disabled || undefined}
      data-active={active() || undefined}
      data-disabled={entry()?.disabled || undefined}
      class={cn(autoCompleteOptionClassName, local.class)}
      onPointerMove={() => autoComplete.controller.setActiveKey(local.itemKey, 'pointer')}
      onPointerDown={(event) => event.preventDefault()}
      onClick={() => autoComplete.controller.selectItem(local.itemKey)}
    >
      {local.children}
    </div>
  )
}
