import { InputNumber } from '@fex-design/react/ui/input-number'
export function FormatterExample() {
  return (
    <div className="grid w-full gap-3">
      <label htmlFor="amount">金额</label>
      <InputNumber
        id="amount"
        defaultValue={1000}
        formatter={(value) => (value === undefined ? '' : `￥ ${value.toLocaleString()}`)}
        parser={(text) => {
          const normalized = text.replace(/[^0-9.-]/g, '')
          if (normalized === '') return undefined
          const value = Number(normalized)
          return Number.isFinite(value) ? value : undefined
        }}
      />
    </div>
  )
}
