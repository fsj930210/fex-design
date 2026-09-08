import { useRef } from 'react'
import { Input } from '@fex-design/react/ui/input'
import { Button } from '@fex-design/react/ui/button'
export function FocusExample() {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div className="grid w-full gap-3">
      <Input ref={ref} defaultValue="通过 ref 控制" />
      <div className="flex gap-2">
        <Button onClick={() => ref.current?.focus()}>聚焦</Button>
        <Button onClick={() => ref.current?.blur()}>失焦</Button>
        <Button onClick={() => ref.current?.select()}>全选</Button>
      </div>
    </div>
  )
}
