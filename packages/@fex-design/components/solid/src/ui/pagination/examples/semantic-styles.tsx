import type { JSX } from 'solid-js'
import { Pagination, type PaginationStyles } from '@fex-design/solid/ui/pagination'
import {
  paginationDemoLabels,
  paginationDemoClassNames,
} from '@fex-design/docs-shared/pagination-demo'
const styles: PaginationStyles<JSX.CSSProperties> = {
  root: {
    'background-color': '#faf5ff',
  },
  total: {
    color: '#6d28d9',
  },
  content: {
    'column-gap': '6px',
  },
  pageButton: {
    'border-color': '#c4b5fd',
  },
  navigationButton: {
    color: '#6d28d9',
  },
  ellipsis: {
    color: '#8b5cf6',
  },
  simple: {
    color: '#6d28d9',
  },
  pageSizeSelect: {
    'min-width': '128px',
  },
  jumper: {
    color: '#6d28d9',
  },
  quickJumper: {
    width: '96px',
  },
}
export default function PaginationSemanticStylesExample() {
  return (
    <div class="grid w-full gap-space-lg">
      <Pagination
        pageSizeSelectProps={{
          selectTriggerProps: {
            style: {
              'border-color': '#c4b5fd',
              color: '#6d28d9',
              'background-color': '#ffffff',
              'border-radius': '6px',
              '--focus-border': '#8b5cf6',
              '--input-ring-width': '1px',
              '--input-ring-color': '#ddd6fe',
            },
          },
          selectContentProps: {
            style: {
              'border-color': '#c4b5fd',
              color: '#6d28d9',
              'background-color': '#ffffff',
              '--primary': '#6d28d9',
              '--muted-background': '#f5f3ff',
              'border-radius': '6px',
              '--focus-border': '#8b5cf6',
              '--input-ring-width': '1px',
              '--input-ring-color': '#ddd6fe',
            },
          },
        }}
        quickJumperProps={{
          inputNumberProps: {
            style: {
              'border-color': '#c4b5fd',
              color: '#6d28d9',
              'background-color': '#ffffff',
              'border-radius': '6px',
              '--focus-border': '#8b5cf6',
              '--input-ring-width': '1px',
              '--input-ring-color': '#ddd6fe',
            },
          },
          inputProps: { style: { color: '#6d28d9' } },
          incrementProps: { style: { color: '#6d28d9' } },
          decrementProps: { style: { color: '#6d28d9' } },
        }}
        total={200}
        defaultPage={8}
        labels={paginationDemoLabels}
        showTotal
        showSizeChanger
        showQuickJumper
        classNames={paginationDemoClassNames}
        styles={styles}
      />
      <Pagination
        pageSizeSelectProps={{
          selectTriggerProps: {
            style: {
              'border-color': '#c4b5fd',
              color: '#6d28d9',
              'background-color': '#ffffff',
              'border-radius': '6px',
              '--focus-border': '#8b5cf6',
              '--input-ring-width': '1px',
              '--input-ring-color': '#ddd6fe',
            },
          },
          selectContentProps: {
            style: {
              'border-color': '#c4b5fd',
              color: '#6d28d9',
              'background-color': '#ffffff',
              '--primary': '#6d28d9',
              '--muted-background': '#f5f3ff',
              'border-radius': '6px',
              '--focus-border': '#8b5cf6',
              '--input-ring-width': '1px',
              '--input-ring-color': '#ddd6fe',
            },
          },
        }}
        quickJumperProps={{
          inputNumberProps: {
            style: {
              'border-color': '#c4b5fd',
              color: '#6d28d9',
              'background-color': '#ffffff',
              'border-radius': '6px',
              '--focus-border': '#8b5cf6',
              '--input-ring-width': '1px',
              '--input-ring-color': '#ddd6fe',
            },
          },
          inputProps: { style: { color: '#6d28d9' } },
          incrementProps: { style: { color: '#6d28d9' } },
          decrementProps: { style: { color: '#6d28d9' } },
        }}
        total={200}
        defaultPage={8}
        labels={paginationDemoLabels}
        showTotal
        showSizeChanger
        showQuickJumper
        simple
        classNames={paginationDemoClassNames}
        styles={styles}
      />
    </div>
  )
}
