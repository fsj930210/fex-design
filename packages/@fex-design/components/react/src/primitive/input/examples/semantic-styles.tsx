import {
  InputRoot,
  InputPrefix,
  InputControl,
  InputClear,
  InputSuffix,
  InputGroup,
  InputAddonAfter,
} from '@fex-design/react/primitive/input'
import { Button } from '@fex-design/react/primitive/button'
import {
  inputActionClassName,
  inputSearchAddonClassName,
} from '@fex-design/components-styles/input'
import { cn } from '@fex-design/utils'
import { EyeIcon } from '@fex-design/react/icons/eye'
import { EyeOffIcon } from '@fex-design/react/icons/eye-off'
import { SearchIcon } from '@fex-design/react/icons/search'
import { useState } from 'react'
export function InputSemanticStylesExample() {
  const [value, setValue] = useState('structured')
  const [visible, setVisible] = useState(false)
  return (
    <div className="grid w-full gap-3">
      <InputRoot
        value={value}
        onValueChange={setValue}
        className="border-violet-300 hover:border-violet-400 focus-within:border-violet-600 focus-within:ring-violet-600/20"
      >
        <InputPrefix className="text-violet-500">@</InputPrefix>
        <InputControl className="font-medium" />
        {value && <InputClear className="hover:text-violet-700" />}
      </InputRoot>
      <InputRoot defaultValue="secret">
        <InputControl type={visible ? 'text' : 'password'} />
        <InputSuffix>
          <button
            type="button"
            data-slot="input-action"
            className={cn(inputActionClassName, 'text-violet-500')}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
            onClick={() => setVisible(!visible)}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </InputSuffix>
      </InputRoot>
      <InputGroup>
        <InputRoot
          defaultValue="主题"
          className="[--input-background:#faf5ff] [--input-border-color:#d8b4fe] [--input-ring-color:#9333ea]"
        >
          <InputControl />
        </InputRoot>
        <InputAddonAfter>
          <Button
            variant="solid"
            color="primary"
            data-input-addon-fill=""
            aria-label="Search"
            className={inputSearchAddonClassName}
          >
            <SearchIcon />
          </Button>
        </InputAddonAfter>
      </InputGroup>
    </div>
  )
}
