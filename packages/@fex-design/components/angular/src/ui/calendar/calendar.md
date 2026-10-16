# Calendar

Import Calendar as a named export from `@fex-design/angular/ui/calendar`.

Calendar displays a full calendar with year/month controls and date/month panels. Set fullscreen=false for a compact card. value/defaultValue accept CalendarDate or null. viewDate/panel control browsing; navigating does not change the selected value.

## Custom content

Use header/cell/fullCell/footer ng-template content with let-state="state", let-controller="controller", and let-cell="cell". Header/Footer receive { state, controller }; Cell receives { cell, state, controller }. Set headerRender=false to hide the header. The footer is hidden when omitted. cellRender adds content outside the date button; fullCellRender replaces cell content and takes priority over cellRender. Include Primitive CalendarCellTrigger to retain selection and keyboard behavior in fully custom cells.

Provide lunar labels and events through custom cell content; they do not change the selected date.

## Events and actions

change reports the selected date; select emits { value, info }, with info.source identifying the selection source. Custom content can call controller.selectCell(cell, 'customize'). Use setYear/setMonth/setViewDate/navigate/setPanel on controller to browse dates and switch panels.

## Week numbers and localization

showWeek displays week numbers in the date panel. locale configures weekday/month labels, button text, weekStartsOn, and firstWeekContainsDate. The component weekStartsOn takes priority. Use weekStartsOn=1 and firstWeekContainsDate=4 for ISO weeks. The default language is Chinese; omitted locale fields use defaults.

## Styling

classNames/styles support header, weekHeader, weekNumber, grid, row, cell, cellTrigger, cellContent, and footer. Use native class/style on the root and to adjust size, spacing, and corners.

Set --calendar-hover-background, --calendar-selected-background, --calendar-selected-foreground, and --calendar-today-color on the root or an ancestor to customize colors.

classNames/styles accept a semantic object or a function that receives { state, controller } and returns one. Custom classes merge after defaults. Adjust week-number column widths through weekHeader/row classes or grid-template-columns styles.
