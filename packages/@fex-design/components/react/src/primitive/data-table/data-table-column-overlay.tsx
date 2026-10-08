import {
  getDataTableColumnSize,
  getDataTableRenderedCells,
  type DataTableRowRenderingSource,
} from '@fex-design/core/data-table/layout'
import {
  dataTableCellClassName,
  dataTableCellContentClassName,
  dataTableHeaderCellClassName,
  dataTableHeaderContentClassName,
  dataTableHeaderClassName,
  dataTableHeaderRowClassName,
  dataTableRootClassName,
  dataTableRowClassName,
  dataTableClassName,
  dataTableBodyClassName,
} from '@fex-design/components-styles/data-table'
import type { Header, Row, RowData, TableFeatures } from '@tanstack/react-table'
import type { CSSProperties } from 'react'
import type { ReactTable } from '@tanstack/react-table'

type DataTableRenderRow<TFeatures extends TableFeatures, TData extends RowData> = Row<
  TFeatures,
  TData
> &
  DataTableRowRenderingSource

export interface DataTableColumnOverlayProps<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {
  table: ReactTable<TFeatures, TData>
  header: Header<TFeatures, TData>
  rows?: Row<TFeatures, TData>[] | undefined
  style?: CSSProperties | undefined
  density?: 'compact' | 'default' | 'relaxed' | undefined
}

export function DataTableColumnOverlay<TFeatures extends TableFeatures, TData extends RowData>({
  table,
  header,
  rows,
  style,
  density = 'default',
}: DataTableColumnOverlayProps<TFeatures, TData>) {
  const columnId = header.column.id
  const renderedRows = (rows ?? table.getRowModel().rows) as DataTableRenderRow<TFeatures, TData>[]

  return (
    <div
      data-slot="data-table-column-overlay"
      className={dataTableRootClassName({ density })}
      style={{ ...style, height: 'auto' }}
    >
      <table className={dataTableClassName} style={{ width: '100%' }}>
        <colgroup>
          <col style={{ width: getDataTableColumnSize(header.column) }} />
        </colgroup>
        <thead className={dataTableHeaderClassName}>
          <tr className={dataTableHeaderRowClassName()}>
            <th className={dataTableHeaderCellClassName}>
              <div
                data-slot="data-table-header-content"
                className={dataTableHeaderContentClassName}
              >
                <table.FlexRender header={header} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className={dataTableBodyClassName}>
          {renderedRows.map((row) => {
            const cell = getDataTableRenderedCells(row).find((item) => item.column.id === columnId)
            return cell ? (
              <tr key={row.id} className={dataTableRowClassName}>
                <td className={dataTableCellClassName}>
                  <div className={dataTableCellContentClassName}>
                    <table.FlexRender cell={cell} />
                  </div>
                </td>
              </tr>
            ) : null
          })}
        </tbody>
      </table>
    </div>
  )
}
