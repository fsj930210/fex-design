import { createSignal } from 'solid-js'
import { inputActionClassName, inputSearchAddonClassName } from '@fex-design/components-styles/input'
import { LoadingIcon } from '@fex-design/solid/icons/loading'
import { SearchIcon } from '@fex-design/solid/icons/search'
import { Button } from '@fex-design/solid/primitive/button'
import {
  InputAddonAfter,
  InputAddonBefore,
  InputControl,
  InputGroup,
  InputPrefix,
  InputRoot,
} from '@fex-design/solid/primitive/input'

export function SearchExample() {
  const [result, setResult] = createSignal('尚未搜索')
  const search = (value: string, source: string) => setResult(`${source}: ${value}`)
  const enter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') search((event.currentTarget as HTMLInputElement).value, 'enter')
  }
  return (
    <div class="grid w-full gap-3">
      <InputGroup>
        <InputRoot defaultValue="组件库">
          <InputControl onKeyDown={enter} />
        </InputRoot>
        <InputAddonAfter>
          <Button
            variant="solid"
            color="primary"
            data-input-addon-fill=""
            aria-label="Search"
            class={inputSearchAddonClassName}
            onClick={() => search('组件库', 'addonAfter')}
          >
            <SearchIcon />
          </Button>
        </InputAddonAfter>
      </InputGroup>
      <InputGroup>
        <InputRoot defaultValue="加载中">
          <InputControl />
        </InputRoot>
        <InputAddonAfter>
          <Button
            variant="solid"
            color="primary"
            disabled
            data-input-addon-fill=""
            aria-label="Search"
            class={inputSearchAddonClassName}
          >
            <LoadingIcon class="animate-spin" />
          </Button>
        </InputAddonAfter>
      </InputGroup>
      <InputRoot>
        <InputControl placeholder="仅按 Enter 搜索" onKeyDown={enter} />
      </InputRoot>
      <InputRoot>
        <InputPrefix>
          <button
            type="button"
            class={inputActionClassName}
            aria-label="Search"
            onClick={() => search('', 'prefix')}
          >
            <SearchIcon />
          </button>
        </InputPrefix>
        <InputControl placeholder="前置搜索图标" onKeyDown={enter} />
      </InputRoot>
      <InputGroup>
        <InputAddonBefore>
          <Button
            variant="solid"
            color="primary"
            data-input-addon-fill=""
            aria-label="Search"
            class={inputSearchAddonClassName}
            onClick={() => search('', 'addonBefore')}
          >
            站内
          </Button>
        </InputAddonBefore>
        <InputRoot>
          <InputControl placeholder="双侧搜索按钮" onKeyDown={enter} />
        </InputRoot>
        <InputAddonAfter>
          <Button
            variant="solid"
            color="primary"
            data-input-addon-fill=""
            aria-label="Search"
            class={inputSearchAddonClassName}
            onClick={() => search('', 'addonAfter')}
          >
            搜索
          </Button>
        </InputAddonAfter>
      </InputGroup>
      <p class="text-sm text-muted-foreground">{result()}</p>
    </div>
  )
}
