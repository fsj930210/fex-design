import { useRef } from 'react'
import { Button } from '@fex-design/react/primitive/button'
import { InputControl, InputRoot } from '@fex-design/react/primitive/input'

export function FocusExample() {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div className="grid w-full gap-3">
      <InputRoot defaultValue="通过 ref 控制">
        <InputControl ref={ref} />
      </InputRoot>
      <div className="flex gap-2">
        <Button onClick={() => ref.current?.focus()}>聚焦</Button>
        <Button onClick={() => ref.current?.blur()}>失焦</Button>
        <Button onClick={() => ref.current?.select()}>全选</Button>
      </div>
    </div>
  )
}
