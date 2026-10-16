# DatePicker / RangePicker

Date and date-range selection, with Input as the default trigger, Popover as the popup container and Calendar as the panel content. Primitive has overridable default styles; UI provides convenient assembly of the same parts and logic.


The default Input only displays values and opens the panel, with `readOnly=true`. Choose dates in the panel; manual text entry is not supported. `format` only controls display.

## Import and use


```tsx
import { DatePicker, RangePicker } from '@fex-design/react/ui/date-picker'

export function DatePickerUsage() {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <DatePicker inputProps={{ size: 'sm', variant: 'filled' }} />
      <RangePicker needConfirm />
    </div>
  )
}
```

## Date and time

Set `showTime` on DatePicker or RangePicker to select a full date and time. Values are native `Temporal.PlainDateTime` objects (`DatePickerDateTime`); create them with `createDatePickerDateTime(year, month, day, hour, minute, second)` from the same component entry. No separate DateTimePicker component is needed.

`showTime` accepts `true` or `{ format, use12Hours, step, defaultOpenValue, disabledTime }`. The full `format` controls input display and supplies time-column tokens unless `showTime.format` overrides them: `YYYY-MM-DD HH:mm` shows hours and minutes, and `YYYY-MM-DD hh:mm A` includes the period column. `step` accepts hour/minute/second increments. `defaultOpenValue` is a TimeValue, or `{ start, end }` for ranges; it defaults to midnight and only initializes the time when a date has no time. It does not create a selected date by itself.

Date-time selection requires confirmation by default. Date and time edits share one draft; cancel or close rolls it back. RangePicker uses one calendar and time columns for the active endpoint: confirm the current endpoint to move to the other, then confirm to submit the range. `needConfirm=false` submits valid edits immediately and keeps the panel open for further time edits. Controlled `value` and `open` must be updated through the framework's change callbacks.

`disabledTime(value, { activePart, from })` receives the complete date-time and the opposite range endpoint. Return disabled hour/minute/second/millisecond arrays using the TimePicker contract. Date constraints remain date-based. `showTime` only applies to `picker="date"` and is ignored with `multiple`; other granularities keep their original value types. Primitive default panels include `DatePickerTimePanel`, which can also be composed separately under the corresponding root (`range` for RangePicker).

## Values and granularity

Values are Calendar semantic objects, rather than strings or native Date objects. Create `CalendarDate` / `CalendarYearMonth` with `Temporal.PlainDate.from()` / `Temporal.PlainYearMonth.from()` from `@fex-design/core/calendar/temporal`.

| picker | TValue | Default format |
| --- | --- | --- |
| date | CalendarDate | YYYY-MM-DD |
| week | CalendarWeek: { start, end } | YYYY-W |
| month | CalendarYearMonth | YYYY-MM |
| quarter | CalendarQuarter: { year, quarter: 1 \| 2 \| 3 \| 4 } | YYYY-[Q]Q |
| year | CalendarYear: { year } | YYYY |

The empty DatePicker value is `null` for single selection and `[]` for multiple selection. RangePicker uses `{ start?: TValue; end?: TValue }`, with `{}` as the empty value. Omit unused `defaultValue`. `format` does not change value types: dates and months use the format for display; weeks, quarters and years use their dedicated branches. Week labels do not support arbitrary format overrides.

## DatePicker props

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `` TValue \| readonly TValue[] \| null `` | — | No | Controlled selection; TValue must match picker. |
| `defaultValue` | `` TValue \| readonly TValue[] \| null `` | — | No | Initial selection; omitted means null for single selection or [] for multiple selection. Read only at initialization. |
| `open` | `` boolean `` | — | No | Controlled popup state; update it in the open-change callback. |
| `defaultOpen` | `` boolean `` | false | No | Initial popup state, read only at initialization. |
| `picker` | `` 'date' \| 'week' \| 'month' \| 'quarter' \| 'year' `` | "date" | No | Selection granularity and corresponding value type. |
| `multiple` | `` boolean `` | false | No | Enable multiple selection with an array value and confirmation by default. The default input displays tags without parsing multiple-date text. |
| `maxCount` | `` number `` | — | No | Visible tag limit in multiple mode. Omitted: show all tags and wrap. Explicit: show +N for overflow; 0 shows only the count. Does not limit selectable dates. |
| `showTime` | `boolean \| DatePickerShowTime` | false | No | Enable date-time selection and derive time columns from format. |
| `disabledTime` | `DatePickerDisabledTime` | — | No | Disable time units using the full date-time and active range endpoint. |
| `needConfirm` | `boolean` | `showTime or multiple` | No | Keep edits as a draft until confirmation; date-time and multiple selection default to true. |
| `clearable` | `` boolean `` | true | No | Allow clearing; show the control when content is present and the trigger is hovered or focused. Hidden when disabled. |
| `disabled` | `` boolean `` | false | No | Prevent opening and selection changes. |
| `format` | `` string `` | — | No | Used for date/month display. Quarter formatting replaces YYYY/[Q]Q; years display the year and weeks use the built-in week label. See the value table for defaults. |
| `weekStartsOn` | `` 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 `` | 0 | No | First weekday for week normalization and calendar layout; 0 is Sunday. |
| `minDate` | `` CalendarDate `` | — | No | Earliest selectable date, inclusive. |
| `maxDate` | `` CalendarDate `` | — | No | Latest selectable date, inclusive. |
| `disabledDate` | `(date: CalendarDate, info: DatePickerDisabledDateInfo<TValue>) => boolean` | — | No | Return true to disable. Info contains picker/panel; ranges also provide activePart, from (the opposite endpoint) and rangeValue for dynamic limits. |
| `size` | `` 'sm' \| 'md' \| 'lg' `` | "md" | No | Default input size; an explicit value overrides inputProps.size. |
| `variant` | `` 'outlined' \| 'filled' \| 'borderless' \| 'underlined' `` | "outlined" | No | Default input appearance; an explicit value overrides inputProps.variant. |
| `placeholder` | `` string `` | — | No | Input placeholder; defaults to inputProps.placeholder or the current format, and becomes empty when multiple-selection tags exist. |
| `prefix` | `` ReactNode `` | — | No | Input prefix content. |
| `suffix` | `` ReactNode `` | — | No | Input suffix; defaults to a persistent calendar icon. The clear control replaces it only when clearing is enabled, content is present and the trigger is hovered or focused; the suffix returns otherwise. |
| `inputProps` | `` DatePickerInputProps `` | — | No | Appearance, safe native attributes and events for the default Input. Class/style target the input wrapper; attributes and events target the actual input. |
| `popoverProps` | `` DatePickerPopoverProps `` | — | No | Positioning, mount container, dismissal, mounting and root styles only; default placement is bottom and sideOffset is 6. |
| `calendarProps` | `DatePickerCalendarProps` | — | No | Locale controls weekdays, months, header text, navigation labels and Today text; also supports cellRender and semantic styles. |
| `classNames` | `` DatePickerClassNames `` | — | No | Classes for separator, panelGroup, tags, tag, tagRemove, tagOverflow, footer, today, cancel and confirm. Only existing parts are styled; button keys apply to the default footer. |
| `styles` | `` DatePickerStyles<DatePickerStyle> `` | — | No | The same semantic keys as classNames, using the framework-specific DatePickerStyle. |
| `footer` | `` ReactNode \| ((actions) => ReactNode) `` | — | No | Omitted or undefined displays Today, plus Cancel/Confirm when needConfirm is enabled. Null hides the footer; supplied content or a renderer replaces it. Hiding does not change confirmation rules. |
| `triggerRender` | `` (binding: DatePickerTriggerBinding) => ReactNode `` | — | No | Replace the trigger; forward props and ref. |
| `panelRender` | `` (panel: ReactNode, state: DatePickerContextValue) => ReactNode `` | — | No | Replace panel content; panel contains the reusable default panel. |
| `containerRender` | `` (children: ReactNode, state: DatePickerContextValue) => ReactNode `` | — | No | Replace Popover; render children and connect popup state through state. |
| `className` | `` string `` | — | No | Merged onto the visible trigger. |
| `style` | `` CSSProperties `` | — | No | Visible trigger styles; configure popup styles through popoverProps. |
| `ref` | `` Ref<HTMLElement> `` | — | No | Reference to the default trigger wrapper, not the internal input. |

## RangePicker props

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `` CalendarRange<TValue> `` | — | No | Controlled selection; TValue must match picker. |
| `defaultValue` | `` CalendarRange<TValue> `` | — | No | Initial range; omitted means an empty object. Read only at initialization. |
| `open` | `` boolean `` | — | No | Controlled popup state; update it in the open-change callback. |
| `defaultOpen` | `` boolean `` | false | No | Initial popup state, read only at initialization. |
| `picker` | `` 'date' \| 'week' \| 'month' \| 'quarter' \| 'year' `` | "date" | No | Selection granularity and corresponding value type. |
| `allowEmpty` | `` boolean \| { start?: boolean; end?: boolean } `` | false | No | Permit empty endpoints; a submission still requires at least one valid endpoint. |
| `order` | `` boolean `` | true | No | Sort endpoints at submission and for range highlighting; draft values retain their endpoint. |
| `needConfirm` | `boolean` | `showTime or multiple` | No | Keep edits as a draft until confirmation; date-time and multiple selection default to true. |
| `clearable` | `` boolean `` | true | No | Allow clearing; show the control when content is present and the trigger is hovered or focused. Hidden when disabled. |
| `disabled` | `` boolean `` | false | No | Prevent opening and selection changes. |
| `format` | `` string `` | — | No | Used for date/month display. Quarter formatting replaces YYYY/[Q]Q; years display the year and weeks use the built-in week label. See the value table for defaults. |
| `weekStartsOn` | `` 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 `` | 0 | No | First weekday for week normalization and calendar layout; 0 is Sunday. |
| `minDate` | `` CalendarDate `` | — | No | Earliest selectable date, inclusive. |
| `maxDate` | `` CalendarDate `` | — | No | Latest selectable date, inclusive. |
| `disabledDate` | `(date: CalendarDate, info: DatePickerDisabledDateInfo<TValue>) => boolean` | — | No | Return true to disable. Info contains picker/panel; ranges also provide activePart, from (the opposite endpoint) and rangeValue for dynamic limits. |
| `size` | `` 'sm' \| 'md' \| 'lg' `` | "md" | No | Default input size; an explicit value overrides inputProps.size. |
| `variant` | `` 'outlined' \| 'filled' \| 'borderless' \| 'underlined' `` | "outlined" | No | Default input appearance; an explicit value overrides inputProps.variant. |
| `startPlaceholder` | `` string `` | "开始日期" | No | Start placeholder; overrides the start input configuration. |
| `endPlaceholder` | `` string `` | "结束日期" | No | End placeholder; overrides the end input configuration. |
| `separator` | `` ReactNode `` | — | No | Content centered between equal-width start/end areas with equal spacing on both sides; omitted means an arrow. |
| `suffix` | `` ReactNode `` | — | No | Input suffix; defaults to a persistent calendar icon. The clear control replaces it only when clearing is enabled, content is present and the trigger is hovered or focused; the suffix returns otherwise. |
| `inputProps` | `` DatePickerInputProps `` | — | No | Appearance, safe native attributes and events for the default Input. Class/style target the input wrapper; attributes and events target the actual input. |
| `startInputProps` | `` DatePickerEndpointProps `` | — | No | Safe native attributes for the start input; override shared settings. Set its id/name here. |
| `endInputProps` | `` DatePickerEndpointProps `` | — | No | Safe native attributes for the end input; override shared settings. Set its id/name here. |
| `popoverProps` | `` DatePickerPopoverProps `` | — | No | Positioning, mount container, dismissal, mounting and root styles only; default placement is bottom and sideOffset is 6. |
| `calendarProps` | `DatePickerCalendarProps` | — | No | Locale controls weekdays, months, header text, navigation labels and Today text; also supports cellRender and semantic styles. |
| `classNames` | `` DatePickerClassNames `` | — | No | Classes for separator, panelGroup, tags, tag, tagRemove, tagOverflow, footer, today, cancel and confirm. Only existing parts are styled; button keys apply to the default footer. |
| `styles` | `` DatePickerStyles<DatePickerStyle> `` | — | No | The same semantic keys as classNames, using the framework-specific DatePickerStyle. |
| `footer` | `` ReactNode \| ((actions) => ReactNode) `` | — | No | Omitted or undefined displays Today, plus Cancel/Confirm when needConfirm is enabled. Null hides the footer; supplied content or a renderer replaces it. Hiding does not change confirmation rules. |
| `triggerRender` | `` (binding: RangePickerTriggerBinding) => ReactNode `` | — | No | Replace the trigger; forward props and ref. |
| `panelRender` | `` (panel: ReactNode, state: RangePickerContextValue) => ReactNode `` | — | No | Replace panel content; panel contains the reusable default panel. |
| `containerRender` | `` (children: ReactNode, state: RangePickerContextValue) => ReactNode `` | — | No | Replace Popover; render children and connect popup state through state. |
| `className` | `` string `` | — | No | Merged onto the visible trigger. |
| `style` | `` CSSProperties `` | — | No | Visible trigger styles; configure popup styles through popoverProps. |
| `ref` | `` Ref<HTMLElement> `` | — | No | Reference to the default trigger wrapper, not the internal input. |

## Events and controlled state

Semantic events notify only selection submissions and open/close requests. Initialization, prop synchronization and equivalent values do not emit duplicate notifications. The owner updates controlled `value` and `open`; defaults are read only at initialization. Incomplete range endpoints remain drafts, and cancel/close discards uncommitted drafts.

| Event | Parameters | Description |
| --- | --- | --- |
| onChange | DatePickerSelectionValue / CalendarRange | Submit a valid selection. |
| onOpenChange | boolean | Request popup state changes. |

The following controls a single selection. Use `CalendarRange` and RangePicker / RangePickerRoot to control a range.

```tsx
import { useState } from 'react'
import { DatePicker } from '@fex-design/react/ui/date-picker'
import type { DatePickerSelectionValue } from '@fex-design/react/primitive/date-picker'

export function ControlledDatePicker() {
  const [value, setValue] = useState<DatePickerSelectionValue>(null)
  const [open, setOpen] = useState(false)
  return (
    <DatePicker value={value} onChange={setValue} open={open} onOpenChange={setOpen} />
  )
}
```

## Safe composition settings

These settings are identical on UI and Primitive Root. They are filtered by an allowlist; Root owns values, defaults, disabled state, date constraints, panels, week rules and internal callbacks.

| Setting | Allowed fields |
| --- | --- |
| inputProps | size/variant/placeholder, prefix/suffix, class/style, classNames/styles; id/name/form/title, autoComplete/required, ARIA/data and focus/keyboard/pointer events |
| startInputProps / endInputProps | id, name, form, title, placeholder, required; autoComplete, ; onChange, onFocus, onBlur, onClick, onKeyDown, onKeyUp, onPointerDown, onPointerUp; className, style, aria-*, data-* |
| calendarProps | locale, cellRender, className, style, classNames, styles |
| popoverProps | placement, side, align, sideOffset, alignOffset, strategy, avoidCollisions, collisionBoundary, collisionPadding, matchReferenceWidth, hideWhenDetached, zIndex, getPopupContainer, closeDelay, dismiss, lazyMount, destroyOnHidden, classNames, styles |

`aria-haspopup`, `aria-expanded`, `data-slot`, `data-state`, `data-range-part` and `data-active` are owned by the component and cannot be overridden. Endpoint settings are RangePicker-only and have no size, adornment, semantic-style or reference options. Their class/style target the actual input. Shared inputProps id/name are ignored for ranges; set them separately on startInputProps/endInputProps.

`calendarProps.locale` accepts only display labels: weekdays, months, year, yearSuffix, month, datePanel, monthPanel, previous, next, today and week. yearSuffix defaults to the Chinese year unit; set it to an empty string for a year without a unit. It does not accept weekStartsOn/firstWeekContainsDate. `cellRender` appends content next to the default date button and preserves selection, ARIA and keyboard behavior.

`calendarProps.cellRender`: `(context: CalendarCellRenderContext) => ReactNode`. Receives `{ state, controller, cell }`.

`popoverProps.dismiss` accepts escapeKey/outsidePointer/overlayPointer. Placement defaults to bottom with offset 6; lazyMount defaults to true and destroyOnHidden to false. `side/align` override the corresponding placement parts, for example `{ side: 'bottom', align: 'start' }`; shorthand placements include `bottomLeft`. Open/defaultOpen/trigger/disabled/onOpenChange, arrow and content are outside this safe configuration.

## Semantic styles and direction

| Entry | Style keys |
| --- | --- |
| classNames / styles | separator, panelGroup, tags, tag, tagRemove, tagOverflow, footer, today, cancel, confirm |
| inputProps.classNames / styles | root, control, prefix, suffix, clear |
| popoverProps.classNames / styles | root |
| calendarProps.classNames / styles | header, weekHeader, grid, row, cell, cellTrigger, cellContent |

Styles merge in this order: defaults, semantic settings, explicit native styles. Later settings win. Non-nullish top-level input convenience props override inputProps; endpoint settings override shared input attributes. Footer button keys apply only to the default footer; replacement content owns its styles. Style settings do not create parts.

This framework uses `DatePickerStyle`: `CSSProperties & { [variable: `--${string}`]: string | number | undefined }`.

Use native `dir="ltr"` / `dir="rtl"`; there is no direction prop. Default layouts use logical direction styles. With a Portal, set direction on the actual popup container or global root.


## Content replacement

| Entry | Parameters / content |
| --- | --- |
| triggerRender | `` { props, ref, state } `` |
| panelRender | `` (defaultPanel, state) `` |
| containerRender | `` (children, state) `` |
| footer | `` (actions) / ReactNode / null `` |

The Primitive Root container entry receives the composed content; Trigger content replaces the input and Panel content replaces the calendar body. A replacement container must render the supplied content and connect the current open state and closing actions. Reuse the provided default panel as needed. A present renderer returning empty content still replaces the default. RangePicker has a suffix convenience entry; configure its prefix through inputProps.prefix.

Footer actions: `canConfirm: boolean`, `today()`, `close()`, `clear()`, `confirm()`, `cancel()`. Angular templates read these fields and methods from state.

Null hides the entire footer. Custom content that renders nothing leaves no border or spacing; 0 remains visible where permitted by the framework content type. Primitive uses the DatePickerFooter native content entry; footer is a UI convenience prop.

## Native attributes and element references

UI exposes only the convenience props and className/style/ref listed above; put actual input attributes in inputProps. Primitive parts inherit their corresponding div/button attributes. Trigger ref targets the input wrapper. Custom triggers must spread binding.props and forward binding.ref. Root provides state/container scope and does not treat className as an input class.

## Public types

Both layer entries export the safe configuration and style types: `DatePickerInputProps`, `DatePickerEndpointProps`, `DatePickerCalendarProps`, `DatePickerPopoverProps`, `DatePickerClassNames`, `DatePickerStyles<TStyle>`, `DatePickerStyle`.

UI also exports `DatePickerProps` / `RangePickerProps`; import value and logic types from Primitive.
