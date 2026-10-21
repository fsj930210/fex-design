# Pagination Primitive

## Purpose

Pagination for lists, search results and tables with a known total record count. Default styles can be overridden.

## Import and usage

Named imports: `PaginationRoot, PaginationContent, PaginationPageButton, PaginationNavigationButton, PaginationEllipsis, PaginationPageSizeSelect, PaginationQuickJumper` from `@fex-design/angular/primitive/pagination`.

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  PaginationRoot,
  PaginationContent,
  PaginationPageButton,
  PaginationNavigationButton,
  PaginationEllipsis,
  PaginationPageSizeSelect,
  PaginationQuickJumper,
} from '@fex-design/angular/primitive/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
import {
  paginationTotalClassName,
  paginationJumperGroupClassName,
} from '@fex-design/components-styles/pagination'
@Component({
  selector: 'pagination-full-example',
  standalone: true,
  imports: [
    PaginationRoot,
    PaginationContent,
    PaginationPageButton,
    PaginationNavigationButton,
    PaginationEllipsis,
    PaginationPageSizeSelect,
    PaginationQuickJumper,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './full.html',
})
export class PaginationFullExample {
  readonly labels = paginationDemoLabels
  readonly totalClass = paginationTotalClassName
  readonly jumperClass = paginationJumperGroupClassName
}
```

```html
<div class="grid w-full gap-space-lg">
  <nav paginationRoot [total]="200" [labels]="labels" [defaultPage]="8">
    <ng-template #content let-view0>
      <span data-slot="pagination-total" [class]="totalClass"
        >{{ view0.labels.total(view0.total) }}</span
      >
      <div paginationContent>
        <button paginationNavigationButton direction="prev"></button>
        @for (item of view0.pages; track item.key) { @if (item.type === 'page') {
        <button paginationPageButton [page]="item.page"></button> } @else {
        <span paginationEllipsis></span> } }
        <button paginationNavigationButton direction="next"></button>
      </div>
      <div paginationPageSizeSelect></div>
      <div data-slot="pagination-jumper" [class]="jumperClass">
        <span>{{ view0.labels.jumpPrefix }}</span>
        <div paginationQuickJumper></div>
        <span>{{ view0.labels.jumpSuffix }}</span>
      </div>
    </ng-template>
  </nav>
</div>
```

## Props

| Name                                                                  | Type                      | Default        | Required | Description                                                        |
| --------------------------------------------------------------------- | ------------------------- | -------------- | -------- | ------------------------------------------------------------------ |
| total                                                                 | number                    | 0              | No       | Total record count.                                                |
| page / defaultPage                                                    | number                    | 1              | No       | Controlled current page / initial uncontrolled page.               |
| pageSize / defaultPageSize                                            | number                    | 10             | No       | Controlled page size / initial uncontrolled size.                  |
| siblingCount / boundaryCount                                          | number                    | 1              | No       | Pages retained beside the current page / at each boundary.         |
| size                                                                  | sm / md / lg              | md             | No       | Size for buttons, the select and the number input.                 |
| disabled                                                              | boolean                   | false          | No       | Disable pagination changes.                                        |
| labels                                                                | Partial<PaginationLabels> | English labels | No       | Navigation labels, total text, page size options and jump affixes. |
| PaginationPageButton.page                                             | number                    | —              | Yes      | Required target page; invalid targets are disabled.                |
| PaginationNavigationButton.direction                                  | prev / next               | —              | Yes      | Required adjacent page direction.                                  |
| PaginationPageSizeSelect.options                                      | readonly number[]         | [10,20,50,100] | No       | Available page sizes.                                              |
| PageButton / NavigationButton / PageSizeSelect / QuickJumper.disabled | boolean                   | false          | No       | Disable the individual part.                                       |
| PageSizeSelect / QuickJumper.inputProps                               | native input attributes   | undefined      | No       | Attributes and events of the inner input.                          |

## Events and controlled state

`change({ value, details })`. value is { page, pageSize }; details contains reason and previousValue. The caller updates controlled fields. Undefined selects uncontrolled mode, and defaults are read once. Changing page size resets to page 1 with one complete change event. Configuration synchronization and repeated actions on the current page do not emit change.

Call usePagination in an injection context and read snapshot(). Use a signal getter or controller.setOptions for configuration updates. Root exposes controller/snapshot via exportAs.

## Content, native attributes and references

Page, navigation and ellipsis content can be replaced using native children, slots, snippets or projection. Class/style belong to each host.

The root forwards native nav attributes, including dir, class/style and events. Inputs accept inputProps. React uses the ref prop; Solid uses ref callbacks. Vue Root exposes controller/snapshot through a template ref. Svelte Root exposes getController()/getSnapshot() through bind:this. Angular Root exposes its instance through a template reference, and native hosts can be accessed with ElementRef.

## Layout and structured styles

The region order is total, pages, page size and quick jumper. Use CSS for separated alignment; no layout prop is needed.

```css
.pagination-separated {
  width: 100%;
}
.pagination-separated > [data-slot='pagination-total'] {
  margin-inline-end: auto;
}
```

Each part accepts native class/style directly. Compose total text, simple page content and jump affixes with the shared default styles.

## CSS variables

| Variable                         | Description                                   |
| -------------------------------- | --------------------------------------------- |
| --pagination-control-height      | Control height and minimum page button width. |
| --pagination-font-size           | Text size.                                    |
| --pagination-gap                 | Gap between pagination regions.               |
| --pagination-item-gap            | Gap between page items.                       |
| --pagination-radius              | Button, select and number input radius.       |
| --pagination-color               | Default page and navigation button text.      |
| --pagination-active-background   | Current page background.                      |
| --pagination-active-color        | Current page text.                            |
| --pagination-active-border-color | Current page border.                          |
| --pagination-hover-background    | Page and navigation button hover background.  |

## Notes and composition

Quick jumping commits only on Enter; empty and non-integer input is ignored. With total 0 there are no page items, range is [0,0], and simple content displays 0 / 0. A reduced total clamps the effective page without overwriting controlled input. Native dir supports RTL. Buttons retain native Tab/Enter/Space interaction. Requests, filter resets and scrolling belong to caller events. Combine with lists, search and tables.

## Examples

basic, full, controlled, simple, sizes, page-size-options, page-range, disabled, empty, hide-on-single-page, custom, layout, direction, logic, css-variables.

Shared scenes use the same configuration, interactions, feedback and default styles. Only semantic-styles is UI-specific. Controlled examples include external setters and reset; both layers include css-variables.
