# Pagination UI

## Purpose

Pagination for lists, search results and tables with a known total record count. Default styles can be overridden.

## Import and usage

Named imports: `Pagination` from `@fex-design/svelte/ui/pagination`.

```svelte
<script lang="ts">
  import { Pagination } from '@fex-design/svelte/ui/pagination'
  import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
</script>
<div class="grid w-full gap-space-lg">

  <Pagination total={200} labels={paginationDemoLabels} defaultPage={8} showTotal showSizeChanger showQuickJumper />
</div>
```

## Props

| Name                                   | Type                       | Default        | Required | Description                                                        |
| -------------------------------------- | -------------------------- | -------------- | -------- | ------------------------------------------------------------------ |
| total                                  | number                     | 0              | No       | Total record count.                                                |
| page / defaultPage                     | number                     | 1              | No       | Controlled current page / initial uncontrolled page.               |
| pageSize / defaultPageSize             | number                     | 10             | No       | Controlled page size / initial uncontrolled size.                  |
| siblingCount / boundaryCount           | number                     | 1              | No       | Pages retained beside the current page / at each boundary.         |
| size                                   | sm / md / lg               | md             | No       | Size for buttons, the select and the number input.                 |
| disabled                               | boolean                    | false          | No       | Disable pagination changes.                                        |
| labels                                 | Partial<PaginationLabels>  | English labels | No       | Navigation labels, total text, page size options and jump affixes. |
| showTotal                              | boolean / content function | false          | No       | Show the total; React/Solid also accept a snapshot renderer.       |
| showSizeChanger                        | boolean                    | false          | No       | Show the page size selector.                                       |
| pageSizeOptions                        | readonly number[]          | [10,20,50,100] | No       | Available page sizes; the current value is included.               |
| showQuickJumper                        | boolean                    | false          | No       | Show the jump input and affixes.                                   |
| simple                                 | boolean                    | false          | No       | Replace page buttons with current page / page count.               |
| hideOnSinglePage                       | boolean                    | false          | No       | Hide pagination when the page count is 0 or 1.                     |
| classNames                             | PaginationClassNames       | undefined      | No       | Classes for the named parts.                                       |
| styles                                 | PaginationStyles<string>   | undefined      | No       | Native styles for the named parts.                                 |
| pageSizeSelectProps / quickJumperProps | object                     | undefined      | No       | Host class/style, disabled and native inputProps.                  |

## Events and controlled state

`onchange(value, details)`. value is { page, pageSize }; details contains reason and previousValue. The caller updates controlled fields. Undefined selects uncontrolled mode, and defaults are read once. Changing page size resets to page 1 with one complete change event. Configuration synchronization and repeated actions on the current page do not emit change.

Read snapshot(); use bind:page and bind:pageSize for two-way binding.

## Content, native attributes and references

React/Solid use showTotal(snapshot), pageRender(page, current), previous, next and ellipsis. Vue uses total/page scoped slots and previous/next/ellipsis slots. Svelte uses totalContent/pageContent and previous/next/ellipsis snippets. Angular uses #total/#page/#previous/#next/#ellipsis templates. The total renderer receives total, range, page, pageSize and pageCount in snapshot.

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

classNames/styles support root, total, content, pageButton, navigationButton, ellipsis, simple, pageSizeSelect, jumper and quickJumper. React uses CSSProperties, Vue uses StyleValue, Solid uses JSX.CSSProperties or strings, and Svelte/Angular use strings. Native root and part class/style merge last. Primitive hosts do not expose this aggregate API.

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

basic, full, controlled, simple, sizes, page-size-options, page-range, disabled, empty, hide-on-single-page, custom, layout, direction, logic, css-variables, semantic-styles.

Shared scenes use the same configuration, interactions, feedback and default styles. Only semantic-styles is UI-specific. Controlled examples include external setters and reset; both layers include css-variables.
