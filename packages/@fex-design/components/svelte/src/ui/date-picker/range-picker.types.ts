import type { ComponentProps, Snippet } from 'svelte'
import type {
  RangePickerContextValue,
  DatePickerFooterContent,
  RangePickerRoot,
  RangePickerTrigger,
} from '@fex-design/svelte/primitive/date-picker'

export type RangePickerProps = Omit<
  ComponentProps<typeof RangePickerRoot>,
  'children' | 'container'
> &
  Pick<
    ComponentProps<typeof RangePickerTrigger>,
    | 'startPlaceholder'
    | 'endPlaceholder'
    | 'separator'
    | 'suffix'
    | 'size'
    | 'variant'
    | 'class'
    | 'style'
  > & {
    trigger?: ComponentProps<typeof RangePickerTrigger>['children'] | undefined
    container?: ComponentProps<typeof RangePickerRoot>['container'] | undefined
    panel?: Snippet<[Snippet, RangePickerContextValue]> | undefined
    footer?: DatePickerFooterContent | undefined
  }
