import { MinusIcon } from '@fex-design/react/icons/minus'
import { PlusIcon } from '@fex-design/react/icons/plus'
import { useInputNumber } from '@fex-design/react/primitive/input-number'
import { Button } from '@fex-design/react/primitive/button'

export function CustomLogicExample() {
  const number = useInputNumber({ defaultValue: 5, min: 0, max: 10 })
  return (
    <div className="inline-flex items-center gap-2">
      <Button aria-label="减少" disabled={!number.canDecrement} onClick={number.decrement}>
        <MinusIcon />
      </Button>
      <output className="min-w-10 text-center font-medium">{number.value}</output>
      <Button aria-label="增加" disabled={!number.canIncrement} onClick={number.increment}>
        <PlusIcon />
      </Button>
    </div>
  )
}
