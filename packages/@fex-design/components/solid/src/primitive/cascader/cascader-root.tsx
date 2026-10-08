import { createCascaderController } from '@fex-design/core/cascader/create-cascader-controller'
import type {
  CascaderChangeMeta,
  CascaderFieldNames,
  CascaderFilterOption,
  CascaderOption,
  CascaderValue,
} from '@fex-design/core/cascader/types'
import { createMemo, type JSX, type ParentProps } from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { Popover } from '../popover'
import { CascaderContext, type CascaderContextValue } from './cascader-context'

export interface CascaderRootProps extends ParentProps {
  options?: readonly CascaderOption[]
  fieldNames?: CascaderFieldNames
  value?: CascaderValue
  defaultValue?: CascaderValue
  onChange?: (value: CascaderValue, meta: CascaderChangeMeta) => void
  multiple?: boolean
  checkStrictly?: boolean
  changeOnSelect?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  expandTrigger?: 'click' | 'hover'
  showSearch?: boolean
  filterOption?: boolean | CascaderFilterOption
  onSearch?: (keyword: string) => void
  loadData?: (path: readonly CascaderOption[]) => Promise<void>
  clearable?: boolean
  loading?: boolean
  disabled?: boolean
  placeholder?: string
  status?: 'error' | 'warning'
  displayRender?: (labels: readonly string[], path: readonly CascaderOption[]) => JSX.Element
}

export function CascaderRoot(props: CascaderRootProps) {
  const controller = createCascaderController({
    get options() {
      return props.options
    },
    get fieldNames() {
      return props.fieldNames
    },
    get value() {
      return props.value
    },
    get defaultValue() {
      return props.defaultValue
    },
    get multiple() {
      return props.multiple
    },
    get checkStrictly() {
      return props.checkStrictly
    },
    get changeOnSelect() {
      return props.changeOnSelect
    },
    get open() {
      return props.open
    },
    get defaultOpen() {
      return props.defaultOpen
    },
    get expandTrigger() {
      return props.expandTrigger
    },
    get filterOption() {
      return props.filterOption
    },
    onChange: (value, meta) => props.onChange?.(value, meta),
    onOpenChange: (open) => props.onOpenChange?.(open),
    onSearch: (value) => props.onSearch?.(value),
    get loadData() {
      return props.loadData
    },
  })
  const snapshot = createCoreStoreSignal(controller)
  const selectedPaths = createMemo(() => {
    snapshot()
    return controller.getSelectedPaths()
  })
  const context: CascaderContextValue = {
    controller,
    snapshot,
    selectedPaths,
    multiple: () => props.multiple === true,
    expandTrigger: () => props.expandTrigger ?? 'click',
    showSearch: () => props.showSearch === true,
    clearable: () => props.clearable === true,
    disabled: () => props.disabled === true,
    loading: () => props.loading === true,
    status: () => props.status,
    placeholder: () => props.placeholder,
    displayRender: props.displayRender,
  }
  return (
    <CascaderContext.Provider value={context}>
      <Popover
        align="start"
        open={snapshot().open}
        defaultOpen={props.defaultOpen ?? false}
        disabled={props.disabled}
        onOpenChange={(open) => (open ? controller.open() : controller.close())}
      >
        {props.children}
      </Popover>
    </CascaderContext.Provider>
  )
}
