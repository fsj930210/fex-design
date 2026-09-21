import { useState } from 'react'
import { inputActionClassName } from '@fex-design/components-styles/input'
import { EyeIcon } from '@fex-design/react/icons/eye'
import { EyeOffIcon } from '@fex-design/react/icons/eye-off'
import { InputClear, InputControl, InputRoot, InputSuffix } from '@fex-design/react/primitive/input'

function Password({
  defaultValue,
  toggle = true,
  invalid = false,
}: {
  defaultValue?: string
  toggle?: boolean
  invalid?: boolean
}) {
  const [visible, setVisible] = useState(false)
  return (
    <InputRoot defaultValue={defaultValue}>
      <InputControl
        type={visible ? 'text' : 'password'}
        placeholder={toggle ? undefined : '无切换按钮'}
        aria-invalid={invalid || undefined}
      />
      {invalid && <InputClear />}
      {toggle && (
        <InputSuffix>
          <button
            type="button"
            className={inputActionClassName}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
            onClick={() => setVisible(!visible)}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </InputSuffix>
      )}
    </InputRoot>
  )
}

export function PasswordExample() {
  return (
    <div className="grid w-full gap-3">
      <Password defaultValue="secret" />
      <Password toggle={false} />
      <Password defaultValue="wrong-password" invalid />
    </div>
  )
}
