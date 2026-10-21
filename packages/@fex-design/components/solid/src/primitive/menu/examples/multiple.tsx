import { Button } from '@fex-design/solid/ui/button'
import { MenuRoot, MenuContent, MenuItem } from '@fex-design/solid/primitive/menu'
import { menuSelectionItems } from '@fex-design/docs-shared/menu-demo'
import { createSignal, For } from 'solid-js'
export function MenuMultipleExample() {
  const [multiple, setMultiple] = createSignal(false)
  const [value, setValue] = createSignal<string[]>(['users'])
  return (
    <div class="grid w-full max-w-xs gap-3">
      <div class="flex gap-2">
        <Button
          onClick={() => {
            if (multiple()) setValue(value().slice(0, 1))
            setMultiple(!multiple())
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
      <MenuRoot layout="inline" multiple={multiple()} value={value()} onValueChange={setValue}>
        <MenuContent aria-label="Selection menu">
          <For each={menuSelectionItems}>
            {(item) => (
              <MenuItem value={item.value} disabled={item.disabled}>
                {item.label}
              </MenuItem>
            )}
          </For>
        </MenuContent>
      </MenuRoot>
      <output>
        multiple: {String(multiple())} / value: [{value().join(', ')}]
      </output>
    </div>
  )
}
