import { Button } from '@fex-design/react/ui/button'
import { MenuRoot, MenuContent, MenuItem } from '@fex-design/react/primitive/menu'
import { menuSelectionItems } from '@fex-design/docs-shared/menu-demo'
import { useState } from 'react'
export function MenuMultipleExample() {
  const [multiple, setMultiple] = useState(false)
  const [value, setValue] = useState<string[]>(['users'])
  return (
    <div className="grid w-full max-w-xs gap-3">
      <div className="flex gap-2">
        <Button
          onClick={() => {
            if (multiple) setValue(value.slice(0, 1))
            setMultiple(!multiple)
          }}
        >
          切换单选 / 多选
        </Button>
        <Button
          onClick={() => {
            setMultiple(false)
            setValue(['users'])
          }}
        >
          重置
        </Button>
      </div>
      <MenuRoot layout="inline" multiple={multiple} value={value} onValueChange={setValue}>
        <MenuContent aria-label="Selection menu">
          {menuSelectionItems.map((item) => (
            <MenuItem key={item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </MenuItem>
          ))}
        </MenuContent>
      </MenuRoot>
      <output>
        multiple: {String(multiple)} / value: [{value.join(', ')}]
      </output>
    </div>
  )
}
