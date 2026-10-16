# DatePicker / RangePicker

Date and date-range selection, with Input as the default trigger, Popover as the popup container and Calendar as the panel content. Primitive has overridable default styles; UI provides convenient assembly of the same parts and logic.


The default Input only displays values and opens the panel, with `readOnly=true`. Choose dates in the panel; manual text entry is not supported. `format` only controls display.

## Import and use


```ts
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePicker, RangePicker } from '@fex-design/angular/ui/date-picker'

@Component({
  selector: 'date-picker-usage',
  standalone: true,
  imports: [DatePicker, RangePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './date-picker-usage.html',
})
export class DatePickerUsage {}
```

```html
<div class="flex flex-wrap items-start gap-4">
  <div datePicker [inputProps]="{ size: 'sm', variant: 'filled' }"></div>
  <div rangePicker [needConfirm]="true"></div>
</div>
```

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
| `needConfirm` | `` boolean `` | "multiple" | No | Keep the selection draft until confirm; defaults to multiple: false for single selection and true for multiple selection. |
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
| `prefix` | `` string \| number \| TemplateRef<unknown> `` | — | No | Input prefix content. |
| `suffix` | `` string \| number \| TemplateRef<unknown> `` | — | No | Input suffix; defaults to a persistent calendar icon. The clear control replaces it only when clearing is enabled, content is present and the trigger is hovered or focused; the suffix returns otherwise. |
| `inputProps` | `` DatePickerInputProps `` | — | No | Appearance, safe native attributes and events for the default Input. Class/style target the input wrapper; attributes and events target the actual input. |
| `popoverProps` | `` DatePickerPopoverProps `` | — | No | Positioning, mount container, dismissal, mounting and root styles only; default placement is bottom and sideOffset is 6. |
| `calendarProps` | `DatePickerCalendarProps` | — | No | Locale controls weekdays, months, header text, navigation labels and Today text; also supports cellRender and semantic styles. |
| `classNames` | `` DatePickerClassNames `` | — | No | Classes for separator, panelGroup, tags, tag, tagRemove, tagOverflow, footer, today, cancel and confirm. Only existing parts are styled; button keys apply to the default footer. |
| `styles` | `` DatePickerStyles<DatePickerStyle> `` | — | No | The same semantic keys as classNames, using the framework-specific DatePickerStyle. |
| `footer` | `` string \| number \| TemplateRef<unknown> \| null `` | — | No | Omitted or undefined displays Today, plus Cancel/Confirm when needConfirm is enabled. Null hides the footer; supplied content or a renderer replaces it. Hiding does not change confirmation rules. |
| `class` | `` string `` | — | No | Merged onto the visible trigger. |
| `style` | `` string \| Record<string, string \| number \| null \| undefined> `` | — | No | Visible trigger styles; configure popup styles through popoverProps. |

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
| `needConfirm` | `` boolean `` | false | No | Keep the range draft until confirm; otherwise submit a range once it satisfies allowEmpty and the constraints. |
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
| `separator` | `` string `` | — | No | Content centered between equal-width start/end areas with equal spacing on both sides; omitted means an arrow. |
| `suffix` | `` string \| number \| TemplateRef<unknown> `` | — | No | Input suffix; defaults to a persistent calendar icon. The clear control replaces it only when clearing is enabled, content is present and the trigger is hovered or focused; the suffix returns otherwise. |
| `inputProps` | `` DatePickerInputProps `` | — | No | Appearance, safe native attributes and events for the default Input. Class/style target the input wrapper; attributes and events target the actual input. |
| `startInputProps` | `` DatePickerEndpointProps `` | — | No | Safe native attributes for the start input; override shared settings. Set its id/name here. |
| `endInputProps` | `` DatePickerEndpointProps `` | — | No | Safe native attributes for the end input; override shared settings. Set its id/name here. |
| `popoverProps` | `` DatePickerPopoverProps `` | — | No | Positioning, mount container, dismissal, mounting and root styles only; default placement is bottom and sideOffset is 6. |
| `calendarProps` | `DatePickerCalendarProps` | — | No | Locale controls weekdays, months, header text, navigation labels and Today text; also supports cellRender and semantic styles. |
| `classNames` | `` DatePickerClassNames `` | — | No | Classes for separator, panelGroup, tags, tag, tagRemove, tagOverflow, footer, today, cancel and confirm. Only existing parts are styled; button keys apply to the default footer. |
| `styles` | `` DatePickerStyles<DatePickerStyle> `` | — | No | The same semantic keys as classNames, using the framework-specific DatePickerStyle. |
| `footer` | `` string \| number \| TemplateRef<unknown> \| null `` | — | No | Omitted or undefined displays Today, plus Cancel/Confirm when needConfirm is enabled. Null hides the footer; supplied content or a renderer replaces it. Hiding does not change confirmation rules. |
| `class` | `` string `` | — | No | Merged onto the visible trigger. |
| `style` | `` string \| Record<string, string \| number \| null \| undefined> `` | — | No | Visible trigger styles; configure popup styles through popoverProps. |

## Events and controlled state

Semantic events notify only selection submissions and open/close requests. Initialization, prop synchronization and equivalent values do not emit duplicate notifications. The owner updates controlled `value` and `open`; defaults are read only at initialization. Incomplete range endpoints remain drafts, and cancel/close discards uncommitted drafts.

| Event | Parameters | Description |
| --- | --- | --- |
| change | DatePickerSelectionValue / CalendarRange | Submit a valid selection. |
| openChange | boolean | Request popup state changes. |

The following controls a single selection. Use `CalendarRange` and RangePicker / RangePickerRoot to control a range.

```ts
import { signal } from '@angular/core'
import type { DatePickerSelectionValue } from '@fex-design/angular/primitive/date-picker'

// Component class fields.
readonly selected = signal<DatePickerSelectionValue>(null)
readonly opened = signal(false)
```

```html
<div datePicker [value]="selected()" (change)="selected.set($event)"
  [open]="opened()" (openChange)="opened.set($event)"></div>
```

## Safe composition settings

These settings are identical on UI and Primitive Root. They are filtered by an allowlist; Root owns values, defaults, disabled state, date constraints, panels, week rules and internal callbacks.

| Setting | Allowed fields |
| --- | --- |
| inputProps | size/variant/placeholder, prefix/suffix, class/style, classNames/styles; id/name/form/title, autoComplete/required, ARIA/data and focus/keyboard/pointer events |
| startInputProps / endInputProps | id, name, form, title, placeholder, required; autoComplete, ; onChange, onFocus, onBlur, onClick, onKeyDown, onKeyUp, onPointerDown, onPointerUp; class, style, aria-*, data-* |
| calendarProps | locale, cellRender, class, style, classNames, styles |
| popoverProps | placement, side, align, sideOffset, alignOffset, strategy, avoidCollisions, collisionBoundary, collisionPadding, matchReferenceWidth, hideWhenDetached, zIndex, getPopupContainer, closeDelay, dismiss, lazyMount, destroyOnHidden, classNames, styles |

`aria-haspopup`, `aria-expanded`, `data-slot`, `data-state`, `data-range-part` and `data-active` are owned by the component and cannot be overridden. Endpoint settings are RangePicker-only and have no size, adornment, semantic-style or reference options. Their class/style target the actual input. Shared inputProps id/name are ignored for ranges; set them separately on startInputProps/endInputProps.

`calendarProps.locale` accepts only display labels: weekdays, months, year, yearSuffix, month, datePanel, monthPanel, previous, next, today and week. yearSuffix defaults to the Chinese year unit; set it to an empty string for a year without a unit. It does not accept weekStartsOn/firstWeekContainsDate. `cellRender` appends content next to the default date button and preserves selection, ARIA and keyboard behavior.

`calendarProps.cellRender`: `TemplateRef<CalendarCellRenderContext>`. Receives `{ state, controller, cell }`.

The template supports `let-context` for the complete context, or `let-cell="cell"`, `let-state="state"` and `let-controller="controller"`.

`popoverProps.dismiss` accepts escapeKey/outsidePointer/overlayPointer. Placement defaults to bottom with offset 6; lazyMount defaults to true and destroyOnHidden to false. `side/align` override the corresponding placement parts, for example `{ side: 'bottom', align: 'start' }`; shorthand placements include `bottomLeft`. Open/defaultOpen/trigger/disabled/onOpenChange, arrow and content are outside this safe configuration.

## Semantic styles and direction

| Entry | Style keys |
| --- | --- |
| classNames / styles | separator, panelGroup, tags, tag, tagRemove, tagOverflow, footer, today, cancel, confirm |
| inputProps.classNames / styles | root, control, prefix, suffix, clear |
| popoverProps.classNames / styles | root |
| calendarProps.classNames / styles | header, weekHeader, grid, row, cell, cellTrigger, cellContent |

Styles merge in this order: defaults, semantic settings, explicit native styles. Later settings win. Non-nullish top-level input convenience props override inputProps; endpoint settings override shared input attributes. Footer button keys apply only to the default footer; replacement content owns its styles. Style settings do not create parts.

This framework uses `DatePickerStyle`: `string | Record<string, string | number | null | undefined>`.

Use native `dir="ltr"` / `dir="rtl"`; there is no direction prop. Default layouts use logical direction styles. With a Portal, set direction on the actual popup container or global root.


## Content replacement

| Entry | Parameters / content |
| --- | --- |
| #trigger | `` let-state="state", let-trigger="trigger", let-ref="ref" `` |
| #panel | `` let-state="state", let-panel="panel" `` |
| #container | `` let-state="state", let-content="content" `` |
| #footer | `` let-state="state" `` |
| #prefix / #suffix | `` TemplateRef `` |

The Primitive Root container entry receives the composed content; Trigger content replaces the input and Panel content replaces the calendar body. A replacement container must render the supplied content and connect the current open state and closing actions. Reuse the provided default panel as needed. A present renderer returning empty content still replaces the default. RangePicker has a suffix convenience entry; configure its prefix through inputProps.prefix.

Footer actions: `canConfirm: boolean`, `today()`, `close()`, `clear()`, `confirm()`, `cancel()`. Angular templates read these fields and methods from state.

Null hides the entire footer. Custom content that renders nothing leaves no border or spacing; 0 remains visible where permitted by the framework content type. Primitive uses the DatePickerFooter native content entry; footer is a UI convenience prop.

## Native attributes and element references

Use native element selectors: UI uses div[datePicker]/div[rangePicker]; Root/Trigger/Content/Panel/PanelGroup/Tags/Footer/WeekHeader/Grid/Row/Cell/Header/Title use div, and action parts/CellTrigger use button. Top-level class/style are native host attributes merged onto the trigger; put actual input attributes in inputProps. Use #picker="datePicker" or #picker="rangePicker" to access UI instances, picker.context() for state and picker.state.controller for actions. Custom trigger templates call ref(element) and trigger.open($event)/focus($event).

## Public types

Both layer entries export the safe configuration and style types: `DatePickerInputProps`, `DatePickerEndpointProps`, `DatePickerCalendarProps`, `DatePickerPopoverProps`, `DatePickerClassNames`, `DatePickerStyles<TStyle>`, `DatePickerStyle`.




## Examples

Import examples from `@fex-design/angular/ui/date-picker/examples`. The 23 scenes include presets, sizes, variants, granularity, multiple selection, ranges, disabled states, dynamic limits, empty endpoints, custom cells, formatting, locale, separate custom-style and LTR/RTL examples. Sources are in the adjacent examples/ directory.
