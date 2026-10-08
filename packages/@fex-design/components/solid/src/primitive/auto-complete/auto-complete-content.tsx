import { autoCompleteContentClassName } from '@fex-design/components-styles/auto-complete'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { PopoverContent, PopoverPortal } from '../popover'
import { AutoCompleteList } from './auto-complete-list'

export function AutoCompleteContent(
  props: ParentProps<{ class?: string; style?: JSX.CSSProperties }>,
) {
  const [local] = splitProps(props, ['children', 'class', 'style'])
  return (
    <PopoverPortal>
      <PopoverContent
        class={cn(autoCompleteContentClassName, local.class)}
        style={`width:var(--auto-complete-content-width,var(--floating-reference-width));max-width:var(--auto-complete-content-width,var(--floating-reference-width));${typeof local.style === 'string' ? local.style : ''}`}
      >
        {local.children ?? <AutoCompleteList />}
      </PopoverContent>
    </PopoverPortal>
  )
}
export { AutoCompleteList, type AutoCompleteListProps } from './auto-complete-list'
export { AutoCompleteOption, type AutoCompleteOptionProps } from './auto-complete-option'
