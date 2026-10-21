import {
  InputRoot,
  InputPrefix,
  InputControl,
  InputClear,
  InputSuffix,
  InputGroup,
  InputAddonAfter,
} from '@fex-design/solid/primitive/input'
import { Button } from '@fex-design/solid/primitive/button'
import {
  inputActionClassName,
  inputSearchAddonClassName,
} from '@fex-design/components-styles/input'
import { cn } from '@fex-design/utils'
import { EyeIcon } from '@fex-design/solid/icons/eye'
import { EyeOffIcon } from '@fex-design/solid/icons/eye-off'
import { SearchIcon } from '@fex-design/solid/icons/search'
import { createSignal } from 'solid-js'
export function InputSemanticStylesExample() {
  const [value, setValue] = createSignal('structured')
  const [visible, setVisible] = createSignal(false)
  return (
    <div class="grid w-full gap-3">
      <InputRoot
        value={value()}
        onValueChange={setValue}
        class="border-violet-300 hover:border-violet-400 focus-within:border-violet-600 focus-within:ring-violet-600/20"
      >
        <InputPrefix class="text-violet-500">@</InputPrefix>
        <InputControl class="font-medium" />
        {value() && <InputClear class="hover:text-violet-700" />}
      </InputRoot>
      <InputRoot defaultValue="secret">
        <InputControl type={visible() ? 'text' : 'password'} />
        <InputSuffix>
          <button
            type="button"
            data-slot="input-action"
            class={cn(inputActionClassName, 'text-violet-500')}
            aria-label={visible() ? 'Hide password' : 'Show password'}
            aria-pressed={visible()}
            onClick={() => setVisible(!visible())}
          >
            {visible() ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </InputSuffix>
      </InputRoot>
      <InputGroup>
        <InputRoot
          defaultValue="主题"
          class="[--input-background:#faf5ff] [--input-border-color:#d8b4fe] [--input-ring-color:#9333ea]"
        >
          <InputControl />
        </InputRoot>
        <InputAddonAfter>
          <Button
            variant="solid"
            color="primary"
            data-input-addon-fill=""
            aria-label="Search"
            class={inputSearchAddonClassName}
          >
            <SearchIcon />
          </Button>
        </InputAddonAfter>
      </InputGroup>
    </div>
  )
}
