import { useInputNumber } from '@fex-design/solid/primitive/input-number'

export function CustomLogicExample() {
  const number = useInputNumber(() => ({ defaultValue: 5, min: 0, max: 10 }))
  return <section class="grid max-w-sm gap-3 rounded-lg border p-4"><label class="grid gap-1"><span>Custom quantity</span><input inputMode="decimal" value={number.draft()} onInput={(event) => number.input(event.currentTarget.value, event)} onBlur={number.blur} onKeyDown={number.keydown} /></label><div class="inline-flex items-center gap-2"><button type="button" aria-label="Decrease" disabled={!number.canDecrement()} onClick={number.decrement}>−</button><output aria-live="polite">{number.formattedValue()}</output><button type="button" aria-label="Increase" disabled={!number.canIncrement()} onClick={number.increment}>+</button></div><small>Range: 0–10</small></section>
}
