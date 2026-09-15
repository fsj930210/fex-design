import { useState } from 'react'
import { Button } from '@fex-design/react/primitive/button'
import {
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
} from '@fex-design/react/primitive/checkbox'

export default function Example() {
  const [checked, setChecked] = useState(true)
  return (
    <div className="grid gap-3">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setChecked(true)}>
          选中
        </Button>
        <Button size="sm" onClick={() => setChecked(false)}>
          取消选中
        </Button>
      </div>
      <CheckboxRoot>
        <CheckboxControl
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
        <CheckboxIndicator />
        <CheckboxLabel>受控 Checkbox</CheckboxLabel>
      </CheckboxRoot>
      <CheckboxRoot>
        <CheckboxControl defaultChecked />
        <CheckboxIndicator />
        <CheckboxLabel>非受控：默认选中</CheckboxLabel>
      </CheckboxRoot>
    </div>
  )
}
