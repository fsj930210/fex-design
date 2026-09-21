import { useState } from 'react'
import { Input } from '@fex-design/react/ui/input'
import { Button } from '@fex-design/react/ui/button'
export function ControlledExample() {
  const [value, setValue] = useState('受控内容')
  return (
    <div className="grid w-full gap-3">
      <Input value={value} onValueChange={setValue} clearable />
      <Input defaultValue="非受控内容" clearable />
      <div className="flex gap-2">
        <Button onClick={() => setValue('外部设置')}>外部设置</Button>
        <Button onClick={() => setValue('')}>外部清空</Button>
      </div>
    </div>
  )
}
