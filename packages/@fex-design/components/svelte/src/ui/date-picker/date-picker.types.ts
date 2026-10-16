import type { ComponentProps, Snippet } from 'svelte'
import type { DatePickerContextValue, DatePickerFooterContent } from '@fex-design/svelte/primitive/date-picker'
import type { DatePickerRoot, DatePickerTrigger } from '@fex-design/svelte/primitive/date-picker'
export type DatePickerProps = Omit<ComponentProps<typeof DatePickerRoot>, 'children' | 'container' | 'startInputProps' | 'endInputProps'> & Pick<ComponentProps<typeof DatePickerTrigger>, 'placeholder' | 'prefix' | 'suffix' | 'size' | 'variant' | 'class' | 'style'> & {
  trigger?: ComponentProps<typeof DatePickerTrigger>['children'] | undefined
  container?: ComponentProps<typeof DatePickerRoot>['container'] | undefined
  panel?: Snippet<[Snippet, DatePickerContextValue]> | undefined
  footer?: DatePickerFooterContent | undefined
}
