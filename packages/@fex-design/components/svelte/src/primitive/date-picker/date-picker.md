# DatePicker / RangePicker

Date and date-range selection, with Input as the default trigger, Popover as the popup container and Calendar as the panel content. Primitive has overridable default styles; UI provides convenient assembly of the same parts and logic.


The default Input only displays values and opens the panel, with `readOnly=true`. Choose dates in the panel; manual text entry is not supported. `format` only controls display.

## Import and use


```svelte
<script lang="ts">
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter, RangePickerRoot, RangePickerTrigger, RangePickerContent, RangePickerPanelGroup } from '@fex-design/svelte/primitive/date-picker'
</script>

<div class="flex flex-wrap items-start gap-4">
  <DatePickerRoot>
    <DatePickerTrigger />
    <DatePickerContent>
      <DatePickerPanel />
      <DatePickerFooter />
    </DatePickerContent>
  </DatePickerRoot>
  <RangePickerRoot needConfirm>
    <RangePickerTrigger />
    <RangePickerContent>
      <RangePickerPanelGroup />
      <DatePickerFooter />
    </RangePickerContent>
  </RangePickerRoot>
</div>
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

## DatePickerRoot props

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
| `inputProps` | `` DatePickerInputProps `` | — | No | Appearance, safe native attributes and events for the default Input. Class/style target the input wrapper; attributes and events target the actual input. |
| `popoverProps` | `` DatePickerPopoverProps `` | — | No | Positioning, mount container, dismissal, mounting and root styles only; default placement is bottom and sideOffset is 6. |
| `calendarProps` | `DatePickerCalendarProps` | — | No | Locale controls weekdays, months, header text, navigation labels and Today text; also supports cellRender and semantic styles. |
| `classNames` | `` DatePickerClassNames `` | — | No | Classes for separator, panelGroup, tags, tag, tagRemove, tagOverflow, footer, today, cancel and confirm. Only existing parts are styled; button keys apply to the default footer. |
| `styles` | `` DatePickerStyles<DatePickerStyle> `` | — | No | The same semantic keys as classNames, using the framework-specific DatePickerStyle. |
| `children` | `` Snippet<[DatePickerContextValue]> `` | — | No | Composition snippet receiving state. |
| `container` | `` Snippet<[DatePickerContextValue, Snippet<[DatePickerContextValue]> \| undefined]> `` | — | No | Receives state and the reusable content snippet; connect popup state explicitly. |

## RangePickerRoot props

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
| `inputProps` | `` DatePickerInputProps `` | — | No | Appearance, safe native attributes and events for the default Input. Class/style target the input wrapper; attributes and events target the actual input. |
| `startInputProps` | `` DatePickerEndpointProps `` | — | No | Safe native attributes for the start input; override shared settings. Set its id/name here. |
| `endInputProps` | `` DatePickerEndpointProps `` | — | No | Safe native attributes for the end input; override shared settings. Set its id/name here. |
| `popoverProps` | `` DatePickerPopoverProps `` | — | No | Positioning, mount container, dismissal, mounting and root styles only; default placement is bottom and sideOffset is 6. |
| `calendarProps` | `DatePickerCalendarProps` | — | No | Locale controls weekdays, months, header text, navigation labels and Today text; also supports cellRender and semantic styles. |
| `classNames` | `` DatePickerClassNames `` | — | No | Classes for separator, panelGroup, tags, tag, tagRemove, tagOverflow, footer, today, cancel and confirm. Only existing parts are styled; button keys apply to the default footer. |
| `styles` | `` DatePickerStyles<DatePickerStyle> `` | — | No | The same semantic keys as classNames, using the framework-specific DatePickerStyle. |
| `children` | `` Snippet<[RangePickerContextValue]> `` | — | No | Composition snippet receiving state. |
| `container` | `` Snippet<[RangePickerContextValue, Snippet<[RangePickerContextValue]> \| undefined]> `` | — | No | Receives state and the reusable content snippet; connect popup state explicitly. |

## Events and controlled state

Semantic events notify only selection submissions and open/close requests. Initialization, prop synchronization and equivalent values do not emit duplicate notifications. The owner updates controlled `value` and `open`; defaults are read only at initialization. Incomplete range endpoints remain drafts, and cancel/close discards uncommitted drafts.

| Event | Parameters | Description |
| --- | --- | --- |
| onChange | DatePickerSelectionValue / CalendarRange | Submit a valid selection. |
| onOpenChange | boolean | Request popup state changes. |

The following controls a single selection. Use `CalendarRange` and RangePicker / RangePickerRoot to control a range.

```svelte
<script lang="ts">
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerPanel, DatePickerFooter } from '@fex-design/svelte/primitive/date-picker'
import type { DatePickerSelectionValue } from '@fex-design/svelte/primitive/date-picker'
let value = $state<DatePickerSelectionValue>(null)
let open = $state(false)
</script>

<DatePickerRoot {value} {open} onChange={next => value = next} onOpenChange={next => open = next}>
    <DatePickerTrigger />
    <DatePickerContent><DatePickerPanel /><DatePickerFooter /></DatePickerContent>
  </DatePickerRoot>
```

## Safe composition settings

These settings are identical on UI and Primitive Root. They are filtered by an allowlist; Root owns values, defaults, disabled state, date constraints, panels, week rules and internal callbacks.

| Setting | Allowed fields |
| --- | --- |
| inputProps | size/variant/placeholder, prefix/suffix, class/style, classNames/styles; id/name/form/title, autoComplete/required, ARIA/data and focus/keyboard/pointer events |
| startInputProps / endInputProps | id, name, form, title, placeholder, required; autocomplete, inputmode, maxlength, minlength; oninput, onchange, onfocus, onblur, onclick, onkeydown, onkeyup, onpointerdown, onpointerup; class, style, aria-*, data-* |
| calendarProps | locale, cellRender, class, style, classNames, styles |
| popoverProps | placement, side, align, sideOffset, alignOffset, strategy, avoidCollisions, collisionBoundary, collisionPadding, matchReferenceWidth, hideWhenDetached, zIndex, getPopupContainer, closeDelay, dismiss, lazyMount, destroyOnHidden, classNames, styles |

`aria-haspopup`, `aria-expanded`, `data-slot`, `data-state`, `data-range-part` and `data-active` are owned by the component and cannot be overridden. Endpoint settings are RangePicker-only and have no size, adornment, semantic-style or reference options. Their class/style target the actual input. Shared inputProps id/name are ignored for ranges; set them separately on startInputProps/endInputProps.

`calendarProps.locale` accepts only display labels: weekdays, months, year, yearSuffix, month, datePanel, monthPanel, previous, next, today and week. yearSuffix defaults to the Chinese year unit; set it to an empty string for a year without a unit. It does not accept weekStartsOn/firstWeekContainsDate. `cellRender` appends content next to the default date button and preserves selection, ARIA and keyboard behavior.

`calendarProps.cellRender`: `Snippet<[CalendarCellRenderContext]>`. Receives `{ state, controller, cell }`.

`popoverProps.dismiss` accepts escapeKey/outsidePointer/overlayPointer. Placement defaults to bottom with offset 6; lazyMount defaults to true and destroyOnHidden to false. `side/align` override the corresponding placement parts, for example `{ side: 'bottom', align: 'start' }`; shorthand placements include `bottomLeft`. Open/defaultOpen/trigger/disabled/onOpenChange, arrow and content are outside this safe configuration.

## Semantic styles and direction

| Entry | Style keys |
| --- | --- |
| classNames / styles | separator, panelGroup, tags, tag, tagRemove, tagOverflow, footer, today, cancel, confirm |
| inputProps.classNames / styles | root, control, prefix, suffix, clear |
| popoverProps.classNames / styles | root |
| calendarProps.classNames / styles | header, weekHeader, grid, row, cell, cellTrigger, cellContent |

Styles merge in this order: defaults, semantic settings, explicit native styles. Later settings win. Non-nullish top-level input convenience props override inputProps; endpoint settings override shared input attributes. Footer button keys apply only to the default footer; replacement content owns its styles. Style settings do not create parts.

This framework uses `DatePickerStyle`: `string`.

Use native `dir="ltr"` / `dir="rtl"`; there is no direction prop. Default layouts use logical direction styles. With a Portal, set direction on the actual popup container or global root.


## Content replacement

| Entry | Parameters / content |
| --- | --- |
| Root | `` children(state); container(state, children) `` |
| Trigger | `` children({ props, action, state }); prefix / suffix: Snippet `` |
| Panel / PanelGroup | `` children: Snippet `` |
| Footer | `` children: Snippet<[DatePickerFooterActions]> / string / number / null `` |

The Primitive Root container entry receives the composed content; Trigger content replaces the input and Panel content replaces the calendar body. A replacement container must render the supplied content and connect the current open state and closing actions. Reuse the provided default panel as needed. A present renderer returning empty content still replaces the default. RangePicker has a suffix convenience entry; configure its prefix through inputProps.prefix.

Footer actions: `canConfirm(): boolean`, `today()`, `close()`, `clear()`, `confirm()`, `cancel()`. Angular templates read these fields and methods from state.

Null hides the entire footer. Custom content that renders nothing leaves no border or spacing; 0 remains visible where permitted by the framework content type. Primitive uses the DatePickerFooter native content entry; footer is a UI convenience prop.

## Native attributes and element references

UI uses class/style without a top-level ref prop; put actual input attributes in inputProps. Primitive presentation parts accept svelte/elements native attributes. Trigger snippets provide { props, action, state }; spread props and attach use:action for popup positioning and lifecycle cleanup.

## Public types

Both layer entries export the safe configuration and style types: `DatePickerInputProps`, `DatePickerEndpointProps`, `DatePickerCalendarProps`, `DatePickerPopoverProps`, `DatePickerClassNames`, `DatePickerStyles<TStyle>`, `DatePickerStyle`.

Primitive also exports `DatePickerPicker`, `DatePickerValue<TPicker>`, `DatePickerSelectionValue<TValue>`, `DatePickerSemanticPart`, `DatePickerPopoverOptions`, `DatePickerContextValue`, `RangePickerContextValue`, `UseDatePickerOptions` and `UseRangePickerOptions`. Import CalendarRange and Calendar value types from `@fex-design/core/calendar`.

## Public parts

| Part | Specific parameters | Purpose |
| --- | --- | --- |
| DatePickerRoot / RangePickerRoot | — | State and safe appearance settings; see the tables above. |
| DatePickerTrigger | size, variant, placeholder, inputProps | Default input or custom trigger. |
| RangePickerTrigger | size, variant, startPlaceholder, endPlaceholder, separator, suffix, inputProps, startInputProps, endInputProps | Default paired inputs or custom trigger. |
| DatePickerContent / RangePickerContent | — | Default PopoverContent container and Portal; inherit PopoverContent native attributes and content entries. |
| DatePickerPanel | calendarProps | Default Calendar; replace its body through its content entry. |
| RangePickerPanel | panelViewDate | One range Calendar; view date inherits Root when omitted. |
| RangePickerPanelGroup | panelCount: 1 \| 2 = 2 | Two adjacent panels by default; its content entry replaces the panel structure. |
| DatePickerHeader | — | Optional header layout container; the default Panel already includes navigation. |
| DatePickerTags | maxCount?: number | Override the Root tag limit; show all tags and wrap when both are omitted. Show +N for overflow and remove through the selection transaction. |
| DatePickerFooter | content / children | Default, hidden or replaced footer using native content entries. |
| DatePickerToday / DatePickerCancel / DatePickerConfirm | — | Today navigates, Cancel discards drafts, Confirm submits valid drafts and closes. |
| DatePickerPreset | — | Styled preset button; the caller performs selection in the native click handler. |
| DatePickerWeekHeader | CalendarWeekHeader | Named Calendar alias reading the current calendar context. |
| DatePickerGrid | CalendarGrid | Inherit the cell-rendering entry and rowProps; grid rows come from context. |
| DatePickerRow | CalendarRow | Named alias of the Calendar row part. |
| DatePickerCell | CalendarCell | Named alias of the Calendar cell part. |
| DatePickerCellTrigger | CalendarCellTrigger | Calendar selection-button alias retaining selection and keyboard semantics. |

Presentation parts inherit native div/button attributes, class/style and events. References and content use framework-native forms. Cell.cell and CellTrigger.cell are required. Full Grid/Row/Cell/CellTrigger/WeekHeader props and slots follow [Calendar](../calendar/calendar.md).

DatePickerPanel also accepts range/panelViewDate for range composition; prefer RangePickerPanel.

## Standalone logic API

`useDatePicker(options | () => options) / useRangePicker(options | () => options)`. Use during component initialization or in .svelte.ts; getOpen()/getValue()/getPanel() provide reactive reads, with getRangeValue() for ranges.

Logic options are the selection/open options above, excluding inputProps/calendarProps/popoverProps and styles. All adapters expose controller for fully custom DOM. Context readers require the corresponding Root and do not replace the standalone logic API.

| Action | Signature | Behavior |
| --- | --- | --- |
| select | (value: TValue) => void | Select a normalized valid value; replace single values, toggle multiple values or update the active range endpoint. |
| confirm / cancel / close | () => void | Confirm submits valid drafts; cancel/close discards uncommitted drafts. |
| clear | () => void | Submit an empty value immediately without closing. |
| today | () => void | Navigate to today and the default panel. |
| openPanel | DatePicker: (); RangePicker: (part?) | Request opening; ranges may specify start/end. |
| setOpen | (open: boolean, part?) => void | Request popup state; closing discards drafts. |
| setPanel / setViewDate | (CalendarPanel) / (CalendarDate) | Update the browsing panel/date without submitting values. |
| remove | DatePicker: (value: TValue) => void | Remove a multiple-selection value according to confirmation rules. |
| previewCell | (cell: CalendarCell) => void | Bind custom Calendar cellSelect to retain intermediate input previews without submitting selection. |
| setHoverValue | (value: CalendarValue \| null) => void | Bind custom Calendar cellHover; pass null to clear temporary previews. |
| setActivePart | RangePicker: ('start' \| 'end') => void | Activate a range endpoint and clear the previous endpoint preview. |

State includes open, panel, viewDate, committedValue, pendingValue, canClear, canConfirm and footerView. DatePicker adds value, calendarValue/calendarValues and inputValue/displayValue. RangePicker adds rangeValue, displayRange, activePart, hoverValue, focusRequest and startText/endText. Read them using the native conventions above.

`hoverValue` is transient hover state and previewValue retains intermediate choices; both are independent of pendingValue/committedValue. Vue uses computed refs, Solid uses accessors, Svelte uses getHoverValue()/getPreviewValue(), and React/Angular context exposes state fields.

Controller also provides `getState()` for derived state, `getSnapshot()` for transaction snapshots, `subscribe(listener)` returning an unsubscribe function, and `setOptions(options)` replacing the complete logic configuration. Framework adapters already synchronize props and clean up subscriptions; normally update native reactive options without adding another subscription.

`useDatePickerContext(component: string)` / `useRangePickerContext(component: string)` read state from the nearest corresponding Root and throw outside it.
