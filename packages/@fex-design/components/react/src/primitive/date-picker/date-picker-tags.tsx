import { usePickerAppearance } from './appearance-context'
import type { ComponentProps } from 'react'
import { getDatePickerTagItems } from '@fex-design/core/date-picker/input'
import { formatDatePickerValue } from '@fex-design/core/date-picker/value'
import { datePickerMultipleTagsClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { Tag, TagAction } from '@fex-design/react/primitive/tag'
import { useDatePickerContext } from './context'

export type DatePickerTagsProps = ComponentProps<'div'> & { maxCount?: number }
export function DatePickerTags( { className, style, maxCount, ...props }: DatePickerTagsProps) {
  const context = useDatePickerContext('DatePickerTags')
  const appearance = usePickerAppearance()
  const tags = getDatePickerTagItems(context.calendarValues, maxCount ?? context.maxCount)
  return <div {...props} style={{ ...appearance.styles?.tags, ...style }} data-slot="date-picker-tags" className={cn(datePickerMultipleTagsClassName, appearance.classNames?.tags, className)}>
    {tags.items.map(item => <Tag key={item.key} size="sm" data-slot="date-picker-tag" className={appearance.classNames?.tag} style={appearance.styles?.tag}>
      {formatDatePickerValue(item.value, context)}
      <TagAction className={appearance.classNames?.tagRemove} style={appearance.styles?.tagRemove} aria-label="移除日期" disabled={context.disabled} onPointerDown={event => { event.preventDefault(); event.stopPropagation() }} onClick={event => { event.stopPropagation(); if (!event.defaultPrevented) context.remove(item.value) }} />
    </Tag>)}
    {tags.overflowCount > 0 ? <Tag size="sm" data-slot="date-picker-tag-overflow" className={appearance.classNames?.tagOverflow} style={appearance.styles?.tagOverflow}>+{tags.overflowCount}</Tag> : null}
  </div>
}
