<script lang="ts">
  import { pickerAppearanceKey } from './appearance-context';
  import type { PickerAppearance } from './appearance.types';
  import type { CalendarDate, CalendarValue, CalendarWeekday } from "@fex-design/core/calendar";
  import { getDatePickerPopoverOptions } from '@fex-design/core/date-picker/options'
  import { pickerOwnerKey } from './owner-context';
  import { pickerContainerKey } from './container-context';
  import type { DatePickerPicker, DatePickerShowTime, DatePickerDisabledTime, DatePickerDisabledDateInfo } from "@fex-design/core/date-picker/types";
  import type { Snippet } from "svelte";
  import { popoverContextKey, type PopoverContext } from '../popover/popover-context';
  import { getContext, setContext } from "svelte";
  import Popover from "../popover/popover.svelte";
  import { datePickerContextKey, type DatePickerSelectionValue } from "./context";
  import { useDatePicker } from "./date-picker-state.svelte";

  import type { DatePickerContextValue } from './context';

  interface Props extends Omit<PickerAppearance, 'startInputProps' | 'endInputProps'> {
    popoverProps?: PickerAppearance['popoverProps'];
    container?: Snippet<[DatePickerContextValue, Snippet<[DatePickerContextValue]> | undefined]>;
    children?: Snippet<[DatePickerContextValue]>;
    value?: DatePickerSelectionValue | undefined;
    defaultValue?: DatePickerSelectionValue | undefined;
    open?: boolean | undefined;
    defaultOpen?: boolean | undefined;
    picker?: DatePickerPicker | undefined;
    multiple?: boolean | undefined;
    maxCount?: number | undefined;
    showTime?: boolean | DatePickerShowTime | undefined;
    disabledTime?: DatePickerDisabledTime | undefined;
    needConfirm?: boolean | undefined;
    disabled?: boolean | undefined;
    clearable?: boolean | undefined;
    format?: string | undefined;
    weekStartsOn?: CalendarWeekday | undefined;
    minDate?: CalendarDate | undefined;
    maxDate?: CalendarDate | undefined;
    disabledDate?: ((date: CalendarDate, info: DatePickerDisabledDateInfo) => boolean) | undefined;
    onChange?: ((value: DatePickerSelectionValue) => void) | undefined;
    onOpenChange?: ((open: boolean) => void) | undefined;
  }
  let props: Props = $props();
  const picker = useDatePicker<CalendarValue>(() => { const { children, container, popoverProps, inputProps, calendarProps, classNames, styles, ...options } = props; return options });
  setContext(pickerAppearanceKey, () => props);
  setContext(pickerOwnerKey, picker);
  setContext(pickerContainerKey, { parentPopover: getContext<PopoverContext | undefined>(popoverContextKey) });
  setContext(datePickerContextKey, picker);
</script>

{#if props.container}
  {@render props.container(picker, props.children)}
{:else}
  <Popover {...getDatePickerPopoverOptions(props.popoverProps)} open={picker.getOpen()} onOpenChange={picker.setOpen}>
    {@render props.children?.(picker)}
  </Popover>
{/if}
