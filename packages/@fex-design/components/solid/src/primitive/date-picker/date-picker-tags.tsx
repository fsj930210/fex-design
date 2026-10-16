import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import { usePickerAppearance } from './appearance-context'
import { For, Show, splitProps, type JSX } from 'solid-js'
import { getDatePickerTagItems } from '@fex-design/core/date-picker/input'
import { formatDatePickerValue } from '@fex-design/core/date-picker/value'
import { datePickerMultipleTagsClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { Tag, TagAction } from '../tag'
import { useDatePickerContext } from './context'

export type DatePickerTagsProps = JSX.HTMLAttributes<HTMLDivElement> & { maxCount?: number }
export function DatePickerTags(props: DatePickerTagsProps) {
  const [local, rest] = splitProps(props, ['class','style','maxCount'])
  const context = useDatePickerContext('DatePickerTags')
  const appearance = usePickerAppearance()
  const tags = () => getDatePickerTagItems(context.calendarValues(), local.maxCount ?? context.maxCount)
  return <div {...rest} style={mergeStyle(appearance().styles?.tags, local.style)} data-slot="date-picker-tags" class={cn(datePickerMultipleTagsClassName, appearance().classNames?.tags, local.class)}>
    <For each={tags().items}>{item => <Tag size="sm" data-slot="date-picker-tag" class={appearance().classNames?.tag} style={appearance().styles?.tag}>
      {formatDatePickerValue(item.value, context)}
      <TagAction class={appearance().classNames?.tagRemove} style={appearance().styles?.tagRemove} aria-label="移除日期" disabled={context.disabled} onPointerDown={event => { event.preventDefault(); event.stopPropagation() }} onClick={event => { event.stopPropagation(); if (!event.defaultPrevented) context.remove(item.value) }} />
    </Tag>}</For>
    <Show when={tags().overflowCount > 0}><Tag size="sm" data-slot="date-picker-tag-overflow" class={appearance().classNames?.tagOverflow} style={appearance().styles?.tagOverflow}>+{tags().overflowCount}</Tag></Show>
  </div>
}
