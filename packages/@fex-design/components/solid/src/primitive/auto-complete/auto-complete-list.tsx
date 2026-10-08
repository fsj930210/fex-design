import { autoCompleteListClassName } from '@fex-design/components-styles/auto-complete'
import { cn } from '@fex-design/utils'
import { For, Show, splitProps, type JSX, type ParentProps } from 'solid-js'
import { Empty, EmptyDescription } from '../empty'
import { Spinner } from '../../ui/spinner'
import { useAutoComplete } from './context'
import { AutoCompleteOption } from './auto-complete-option'

export interface AutoCompleteListProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  item?: (
    item: Record<string, unknown>,
    state: { active: boolean; disabled: boolean },
  ) => JSX.Element
}

export function AutoCompleteList(props: AutoCompleteListProps) {
  const autoComplete = useAutoComplete('AutoCompleteList')
  const [local, rest] = splitProps(props, ['children', 'class', 'item'])
  return (
    <div
      {...rest}
      id={autoComplete.listId}
      role="listbox"
      class={cn(autoCompleteListClassName, local.class)}
    >
      <Show
        when={!autoComplete.loading()}
        fallback={
          <div class="flex min-h-20 items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <Show
          when={autoComplete.items().length}
          fallback={
            <Empty>
              <EmptyDescription>No suggestions</EmptyDescription>
            </Empty>
          }
        >
          {local.children ?? (
            <For each={autoComplete.items()}>
              {(entry) => (
                <AutoCompleteOption itemKey={entry.key}>
                  {local.item?.(entry.item, {
                    active: autoComplete.snapshot().activeKey === entry.key,
                    disabled: entry.disabled,
                  }) ?? entry.label}
                </AutoCompleteOption>
              )}
            </For>
          )}
        </Show>
      </Show>
    </div>
  )
}
