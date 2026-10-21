import type { CSSProperties } from 'react'
import { Pagination, type PaginationStyles } from '@fex-design/react/ui/pagination'
import {
  paginationDemoLabels,
  paginationDemoClassNames,
} from '@fex-design/docs-shared/pagination-demo'
const styles: PaginationStyles<CSSProperties> = {
  root: {
    backgroundColor: '#faf5ff',
  },
  total: {
    color: '#6d28d9',
  },
  content: {
    columnGap: '6px',
  },
  pageButton: {
    borderColor: '#c4b5fd',
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
    minWidth: '128px',
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
    <div className="grid w-full gap-space-lg">
      <Pagination
        pageSizeSelectProps={{
          selectTriggerProps: {
            style: {
              borderColor: '#c4b5fd',
              color: '#6d28d9',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              '--focus-border': '#8b5cf6',
              '--input-ring-width': '1px',
              '--input-ring-color': '#ddd6fe',
            } as CSSProperties,
          },
          selectContentProps: {
            style: {
              borderColor: '#c4b5fd',
              color: '#6d28d9',
              backgroundColor: '#ffffff',
              '--primary': '#6d28d9',
              '--muted-background': '#f5f3ff',
              borderRadius: '6px',
              '--focus-border': '#8b5cf6',
              '--input-ring-width': '1px',
              '--input-ring-color': '#ddd6fe',
            } as CSSProperties,
          },
        }}
        quickJumperProps={{
          inputNumberProps: {
            style: {
              borderColor: '#c4b5fd',
              color: '#6d28d9',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              '--focus-border': '#8b5cf6',
              '--input-ring-width': '1px',
              '--input-ring-color': '#ddd6fe',
            } as CSSProperties,
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
              borderColor: '#c4b5fd',
              color: '#6d28d9',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              '--focus-border': '#8b5cf6',
              '--input-ring-width': '1px',
              '--input-ring-color': '#ddd6fe',
            } as CSSProperties,
          },
          selectContentProps: {
            style: {
              borderColor: '#c4b5fd',
              color: '#6d28d9',
              backgroundColor: '#ffffff',
              '--primary': '#6d28d9',
              '--muted-background': '#f5f3ff',
              borderRadius: '6px',
              '--focus-border': '#8b5cf6',
              '--input-ring-width': '1px',
              '--input-ring-color': '#ddd6fe',
            } as CSSProperties,
          },
        }}
        quickJumperProps={{
          inputNumberProps: {
            style: {
              borderColor: '#c4b5fd',
              color: '#6d28d9',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              '--focus-border': '#8b5cf6',
              '--input-ring-width': '1px',
              '--input-ring-color': '#ddd6fe',
            } as CSSProperties,
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
