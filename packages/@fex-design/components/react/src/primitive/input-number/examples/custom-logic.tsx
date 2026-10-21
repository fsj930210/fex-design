import { useInputNumber } from '@fex-design/react/primitive/input-number'

export function CustomLogicExample() {
  const number = useInputNumber({ defaultValue: 5, min: 0, max: 10 })
  return (
    <section className="grid max-w-sm gap-3 rounded-lg border p-4">
      <label className="grid gap-1"><span>Custom quantity</span><input inputMode="decimal" value={number.draft} onChange={(event) => number.input(event.currentTarget.value, event.nativeEvent)} onBlur={(event) => number.blur(event.nativeEvent)} onKeyDown={number.keydown} /></label>
      <div className="inline-flex items-center gap-2"><button type="button" aria-label="Decrease" disabled={!number.canDecrement} onClick={(event) => number.decrement(event.nativeEvent)}>−</button><output aria-live="polite" className="min-w-10 text-center font-medium">{number.formattedValue}</output><button type="button" aria-label="Increase" disabled={!number.canIncrement} onClick={(event) => number.increment(event.nativeEvent)}>+</button></div>
      <small aria-live="polite">Range: 0–10</small>
    </section>
  )
}
