import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/react/primitive/input-number'
import { InputPrefix, InputSuffix } from '@fex-design/react/primitive/input'
export function FormatterExample() {
  return (
    <div className="grid w-full gap-3">
      <label htmlFor="amount">金额</label>
      <InputNumberRoot
        defaultValue={1000}
        formatter={(value) => (value === undefined ? '' : `￥ ${value.toLocaleString()}`)}
        parser={(text) => {
          const normalized = text.replace(/[^0-9.-]/g, '')
          if (normalized === '') return undefined
          const value = Number(normalized)
          return Number.isFinite(value) ? value : undefined
        }}
      >
        <InputNumberControl id="amount" />
        <InputNumberActions>
          <InputNumberIncrement />
          <InputNumberDecrement />
        </InputNumberActions>
      </InputNumberRoot>
    </div>
  )
}
