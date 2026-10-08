import {
  getDataTableRenderedCells,
  getDataTableVisibleLeafColumns,
  type DataTableRenderingTableSource,
} from '@fex-design/core/data-table/layout'
import {
  dataTableCellClassName,
  dataTableCellContentClassName,
  dataTableRootClassName,
  dataTableRowClassName,
  dataTableClassName,
} from '@fex-design/components-styles/data-table'
import type { Row, RowData, Table, TableFeatures } from '@tanstack/table-core'
import { For, type JSX } from 'solid-js'

function renderTemplate(template: unknown, context: unknown): JSX.Element {
  return typeof template === 'function'
    ? (template(context) as JSX.Element)
    : (template as JSX.Element)
}

export interface DataTableRowOverlayProps<TFeatures extends TableFeatures, TData extends RowData> {
  table: Table<TFeatures, TData>
  row: Row<TFeatures, TData>
  style: JSX.CSSProperties
  density?: 'compact' | 'default' | 'comfortable'
}

export function DataTableRowOverlay<TFeatures extends TableFeatures, TData extends RowData>(
  props: DataTableRowOverlayProps<TFeatures, TData>,
) {
  const source = props.table as unknown as DataTableRenderingTableSource
  const columns = () => getDataTableVisibleLeafColumns(source)
  return (
    <div
      data-slot="data-table-row-overlay"
      class={dataTableRootClassName({ density: props.density ?? 'default' })}
      style={props.style}
    >
      <table class={dataTableClassName}>
        <colgroup>
          <For each={columns()}>
            {(column) => (
              <col
                style={{
                  width: column.getSize?.() === undefined ? undefined : `${column.getSize?.()}px`,
                }}
              />
            )}
          </For>
        </colgroup>
        <tbody>
          <tr class={dataTableRowClassName}>
            <For each={getDataTableRenderedCells(props.row)}>
              {(cell) => (
                <td class={dataTableCellClassName}>
                  <div class={dataTableCellContentClassName}>
                    {renderTemplate(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              )}
            </For>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
