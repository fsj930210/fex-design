# Pagination Primitive

## Purpose

Pagination for lists, search results and tables with a known total record count. Default styles can be overridden.

## Import and usage

Named imports: `PaginationRoot, PaginationContent, PaginationPageButton, PaginationNavigationButton, PaginationEllipsis, PaginationPageSizeSelect, PaginationQuickJumper` from `@fex-design/svelte/primitive/pagination`.

```svelte
<script lang="ts">
  import { PaginationRoot, PaginationContent, PaginationPageButton, PaginationNavigationButton, PaginationEllipsis, PaginationPageSizeSelect, PaginationQuickJumper } from '@fex-design/svelte/primitive/pagination'
  import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
  import { paginationTotalClassName, paginationJumperGroupClassName } from '@fex-design/components-styles/pagination'
  </script>
<div class="grid w-full gap-space-lg">

  <PaginationRoot total={200} labels={paginationDemoLabels} defaultPage={8}>
      {#snippet children(snapshot)}
        <span data-slot="pagination-total" class={paginationTotalClassName}>{snapshot.labels.total(snapshot.total)}</span>
        <PaginationContent>
          <PaginationNavigationButton direction="prev" />
          {#each snapshot.pages as item (item.key)}
            {#if item.type === 'page'}<PaginationPageButton page={item.page} />
            {:else}<PaginationEllipsis />{/if}
          {/each}
          <PaginationNavigationButton direction="next" />
        </PaginationContent>
        <PaginationPageSizeSelect />
        <div data-slot="pagination-jumper" class={paginationJumperGroupClassName}>
          <span>{snapshot.labels.jumpPrefix}</span><PaginationQuickJumper /><span>{snapshot.labels.jumpSuffix}</span>
        </div>
      {/snippet}
    </PaginationRoot>
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

`onchange(value, details)`. value is { page, pageSize }; details contains reason and previousValue. The caller updates controlled fields. Undefined selects uncontrolled mode, and defaults are read once. Changing page size resets to page 1 with one complete change event. Configuration synchronization and repeated actions on the current page do not emit change.

Read snapshot(); use bind:page and bind:pageSize for two-way binding.

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
