# Calendar Primitive

CalendarRoot supports date selection, navigation, and panel switching. Compose the header, grid, cells, and footer to create a calendar.

## Parts

| Part                     | Purpose                                                            |
| ------------------------ | ------------------------------------------------------------------ |
| CalendarRoot             | Shared calendar state and actions                                  |
| CalendarHeader           | Custom header with the current date, panel, and navigation actions |
| CalendarNavigationButton | Previous/next month, year, panel, or today                         |
| CalendarPanelTrigger     | Switch between date, month, quarter, year, and decade panels       |
| CalendarWeekHeader       | Weekday labels; override them with labels                          |
| CalendarGrid             | Default grid or custom content for each cell                       |
| CalendarRow              | Grid row                                                           |
| CalendarCell             | Cell layout and state; includes CalendarCellTrigger by default     |
| CalendarCellTrigger      | Date selection button that fills the cell by default               |
| CalendarFooter           | Footer content and actions                                         |

## Root API

| Property                   | Description                                                                     |
| -------------------------- | ------------------------------------------------------------------------------- |
| value / defaultValue       | Controlled value and initial value; undefined is uncontrolled and null is empty |
| viewDate / defaultViewDate | Visible date; defaults to the initial value or today                            |
| panel / defaultPanel       | Visible panel; defaults to the panel for granularity                            |
| granularity                | date, week, month, quarter, or year; determines the committed value             |
| values / range             | Values or ranges to display; compose the selection flow separately              |
| weekStartsOn               | 0 to 6; defaults to 0                                                           |
| today                      | Override today                                                                  |
| min / max / disabledDate   | Selectable date constraints                                                     |

Default properties initialize state once. Navigation and panel switching do not change the selected value. Selecting a higher-level cell drills down; change fires when the selection reaches granularity. cellSelect is a notification and does not replace selection. Parts accept native attributes, events, classes, and element references.

## Custom cells

CalendarCell does not handle click selection. Include CalendarCellTrigger when supplying custom content. Put dates and other static labels inside the trigger; place event links and other buttons beside it. Adjust the layout with classes to keep interactive areas separate.

## Keyboard

Tab focuses an available date. Arrow keys move between dates; Home/End move to the start/end of a row. PageUp/PageDown change the page and move focus. Enter/Space select through the native button.

## Usage

Import named parts from `@fex-design/vue/primitive/calendar`. Root emits `@change`, `@view-date-change`, and `@panel-change`; listen to `@cell-select` and `@cell-hover` for cell notifications. Header and Grid use scoped slots. The Cell slot receives cell; include CellTrigger in custom cells. Read element through a template ref to access the DOM. Standalone logic is available as `useCalendar(() => options)`.

## Custom content

Custom WeekHeader content receives `{ label, index }`; custom CellTrigger content receives cell. React/Solid use children callbacks, Vue uses scoped slots, Svelte uses snippets, and Angular uses ng-template. Set cell classes on CalendarCell. Angular class bindings merge with the default classes.

## Standalone logic

The logic API returns `{ controller, state, grid }` and supports `TValue extends CalendarValue`. Call actions through controller. React exposes state/grid as render values; Vue exposes computed values (read .value in scripts); Solid and Angular expose accessors; Svelte exposes reactive getters (read properties without destructuring). React accepts an options object; the other frameworks accept an options getter.

Root, Grid, Cell, CellTrigger, and standalone logic support `TValue extends CalendarValue`, defaulting to CalendarValue. Specify custom Grid content types explicitly; child components do not infer the parent generic. For Angular Root, read state() and call actions through controller.

change/onChange fires when the value changes; select/onSelect fires on every committed selection and includes source. Custom UI can call controller.selectCell(cell, 'customize').
