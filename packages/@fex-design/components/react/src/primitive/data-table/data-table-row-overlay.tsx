import {
  getDataTableColumnLayout,
  getDataTableColumnSize,
  getDataTableRenderedCells,
  getDataTableSizingLayout,
  getDataTableVisibleLeafColumns,
  type DataTableColumnLayoutSource,
  type DataTablePinningTableSource,
  type DataTableRenderingTableSource,
  type DataTableRowRenderingSource,
} from '@fex-design/core/data-table/layout'
import {
  dataTableCellClassName,
  dataTableCellContentClassName,
  dataTablePinnedCellClassName,
  dataTablePinnedEndClassName,
  dataTablePinnedEndEdgeClassName,
  dataTablePinnedStartClassName,
  dataTablePinnedStartEdgeClassName,
  dataTableRootClassName,
  dataTableRowClassName,
  dataTableClassName,
} from '@fex-design/components-styles/data-table'
import { cn } from '@fex-design/utils'
import type { Row, RowData, TableFeatures } from '@tanstack/react-table'
import type { CSSProperties } from 'react'
import type { ReactTable } from '@tanstack/react-table'
import type { DataTableClassName } from './data-table'

type DataTableRenderTable<TFeatures extends TableFeatures, TData extends RowData> = ReactTable<
  TFeatures,
  TData
> &
  DataTableRenderingTableSource
type DataTableRenderRow<TFeatures extends TableFeatures, TData extends RowData> = Row<
  TFeatures,
  TData
> &
  DataTableRowRenderingSource

function getLayoutStyle(layoutStyle: Record<string, string | number> | undefined) {
  if (!layoutStyle) return undefined
  const style: CSSProperties = {}
  for (const [key, value] of Object.entries(layoutStyle)) {
    if (value === undefined) continue
    if (key === 'left') style.left = typeof value === 'number' ? `${value}px` : value
    else if (key === 'right') style.right = typeof value === 'number' ? `${value}px` : value
    else if (key === 'top') style.top = typeof value === 'number' ? `${value}px` : value
    else if (key === 'bottom') style.bottom = typeof value === 'number' ? `${value}px` : value
    else if (key === 'width') style.width = typeof value === 'number' ? `${value}px` : value
    else if (key === 'minWidth') style.minWidth = typeof value === 'number' ? `${value}px` : value
    else if (key === 'position') style.position = value as CSSProperties['position']
    else if (key === 'zIndex') style.zIndex = value as CSSProperties['zIndex']
  }
  return style
}

export interface DataTableRowOverlayProps<TFeatures extends TableFeatures, TData extends RowData> {
  table: ReactTable<TFeatures, TData>
  row: Row<TFeatures, TData>
  style?: CSSProperties | undefined
  className?: DataTableClassName | undefined
  density?: 'compact' | 'default' | 'relaxed' | undefined
}

export function DataTableRowOverlay<TFeatures extends TableFeatures, TData extends RowData>({
  table,
  row,
  style,
  className,
  density = 'default',
}: DataTableRowOverlayProps<TFeatures, TData>) {
  const renderTable = table as unknown as DataTableRenderTable<TFeatures, TData>
  const pinningTable = table as unknown as DataTablePinningTableSource
  const { tableWidth } = getDataTableSizingLayout(renderTable)
  const hasPinnedColumns = Boolean(
    pinningTable.getStartVisibleLeafColumns?.().length ||
      pinningTable.getEndVisibleLeafColumns?.().length,
  )
  const visibleLeafColumns = getDataTableVisibleLeafColumns(renderTable)

  return (
    <div
      data-slot="data-table-row-overlay"
      className={cn(dataTableRootClassName({ density }), className?.root)}
      style={style}
    >
      <table
        className={cn(dataTableClassName, className?.table)}
        style={{ width: tableWidth === undefined ? '100%' : `${tableWidth}px` }}
      >
        <colgroup>
          {visibleLeafColumns.map((column) => (
            <col key={column.id} style={{ width: getDataTableColumnSize(column) }} />
          ))}
        </colgroup>
        <tbody>
          <tr className={cn(dataTableRowClassName, className?.row)}>
            {getDataTableRenderedCells(row as DataTableRenderRow<TFeatures, TData>).map((cell) => {
              const columnLayout = getDataTableColumnLayout(
                cell.column as DataTableColumnLayoutSource,
                renderTable,
              )
              const pinned = cell.column.getIsPinned?.()
              return (
                <td
                  key={cell.id}
                  className={cn(
                    dataTableCellClassName,
                    pinned && dataTablePinnedCellClassName,
                    pinned === 'left' && dataTablePinnedStartClassName,
                    pinned === 'right' && dataTablePinnedEndClassName,
                    columnLayout.edge === 'left' && dataTablePinnedStartEdgeClassName,
                    columnLayout.edge === 'right' && dataTablePinnedEndEdgeClassName,
                    className?.cell,
                  )}
                  style={hasPinnedColumns ? getLayoutStyle(columnLayout.style) : undefined}
                >
                  <div className={cn(dataTableCellContentClassName, className?.cellContent)}>
                    <table.FlexRender cell={cell} />
                  </div>
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
