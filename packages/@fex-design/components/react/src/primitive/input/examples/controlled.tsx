import { useState } from 'react'
import { Button } from '@fex-design/react/primitive/button'
import { InputClear, InputControl, InputRoot } from '@fex-design/react/primitive/input'

export function ControlledExample() {
  const [value, setValue] = useState('受控内容')
  return (
    <div className="grid w-full gap-3">
      <InputRoot value={value} onValueChange={setValue}>
        <InputControl />
        <InputClear />
      </InputRoot>
      <InputRoot defaultValue="非受控内容">
        <InputControl />
        <InputClear />
      </InputRoot>
      <div className="flex gap-2">
        <Button onClick={() => setValue('外部设置')}>外部设置</Button>
        <Button onClick={() => setValue('')}>外部清空</Button>
      </div>
    </div>
  )
}
