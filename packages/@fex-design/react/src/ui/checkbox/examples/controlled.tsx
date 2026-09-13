import { useState } from 'react'
import { Button } from '@fex-design/react/ui/button'
import { Checkbox } from '@fex-design/react/ui/checkbox'

export default function Example() {
  const [checked, setChecked] = useState(true)
  return <div className="grid gap-3"><div className="flex gap-2"><Button size="sm" onClick={() => setChecked(true)}>选中</Button><Button size="sm" onClick={() => setChecked(false)}>取消选中</Button></div><Checkbox checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)}>受控 Checkbox</Checkbox><Checkbox defaultChecked>非受控：默认选中</Checkbox></div>
}
