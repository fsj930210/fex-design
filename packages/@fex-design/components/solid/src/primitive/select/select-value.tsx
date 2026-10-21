import type { SelectTriggerProps } from './select-trigger'
import { For, Show, splitProps, type JSX, type ComponentProps } from 'solid-js'
import { useSelect } from './select-context'
import { getSelectValueLayout } from '@fex-design/core/select/value-layout'
import type { SelectOption } from '@fex-design/core/select/types'
import {
  selectPlaceholderClassName,
  selectValueClassName,
} from '@fex-design/components-styles/select'
import { cn } from '@fex-design/utils'
import { Tag, TagAction } from '../tag'

type SelectedTagProps = Omit<ComponentProps<typeof Tag>, 'children' | 'disabled'>
type SelectedTagActionProps = Omit<ComponentProps<typeof TagAction>, 'children' | 'onClick'>

export interface SelectValueProps extends JSX.HTMLAttributes<HTMLDivElement> {
  tagProps?: SelectedTagProps | ((option: SelectOption) => SelectedTagProps) | undefined
  tagActionProps?:
    | SelectedTagActionProps
    | ((option: SelectOption) => SelectedTagActionProps)
    | undefined
  overflowTagProps?: SelectedTagProps | undefined
  children?: JSX.Element | undefined
  placeholder?: string | undefined
  maxTagCount?: number | undefined
  tagRender?: SelectTriggerProps['tagRender'] | undefined
  class?: string | undefined
}

export function SelectValue(props: SelectValueProps) {
  const [local, rest] = splitProps(props, [
    'tagProps',
    'tagActionProps',
    'overflowTagProps',
    'children',
    'placeholder',
    'maxTagCount',
    'tagRender',
    'class',
  ])
  const select = useSelect('SelectValue')
  const layout = () =>
    getSelectValueLayout(select.selectedOptions(), {
      multiple: select.multiple(),
      showSearch: select.showSearch(),
      open: select.snapshot().open,
      searchValue: select.snapshot().searchValue,
      maxTagCount: props.maxTagCount,
    })
  return (
    <Show
      when={props.children == null}
      fallback={
        <div {...rest} class={cn(selectValueClassName, local.class)}>
          {local.children}
        </div>
      }
    >
      <Show
        when={select.selectedOptions().length}
        fallback={
          <Show when={layout().showPlaceholder}>
            <span class={selectPlaceholderClassName}>{props.placeholder ?? '请选择'}</span>
          </Show>
        }
      >
        <Show
          when={layout().showTags}
          fallback={
            <Show when={layout().showSingle}>
              <div {...rest} class={cn(selectValueClassName, local.class)}>
                {select.selectedOptions()[0]?.label}
              </div>
            </Show>
          }
        >
          <div {...rest} class={cn(selectValueClassName, local.class)}>
            <For each={layout().visibleOptions}>
              {(option) =>
                props.tagRender ? (
                  <span>
                    {props.tagRender(option, {
                      remove: () => select.removeValue(option.value),
                      disabled: option.disabled === true,
                    })}
                  </span>
                ) : (
                  <Tag
                    size="sm"
                    {...(typeof props.tagProps === 'function'
                      ? props.tagProps(option)
                      : props.tagProps)}
                    disabled={select.disabled() || option.disabled === true}
                    onPointerDownCapture={(event) => event.preventDefault()}
                  >
                    {option.label}
                    <TagAction
                      {...(typeof props.tagActionProps === 'function'
                        ? props.tagActionProps(option)
                        : props.tagActionProps)}
                      aria-label={`Remove ${String(option.label)}`}
                      onClick={(event) => {
                        event.stopPropagation()
                        select.removeValue(option.value)
                      }}
                    />
                  </Tag>
                )
              }
            </For>
            <Show when={layout().overflowCount > 0}>
              <Tag size="sm" {...props.overflowTagProps}>
                +{layout().overflowCount}
              </Tag>
            </Show>
          </div>
        </Show>
      </Show>
    </Show>
  )
}
