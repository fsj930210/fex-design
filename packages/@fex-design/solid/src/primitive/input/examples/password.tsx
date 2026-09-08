import { createSignal } from 'solid-js'
import { inputActionClassName } from '@fex-design/styles/input'
import { EyeIcon } from '@fex-design/solid/icon/eye'
import { EyeOffIcon } from '@fex-design/solid/icon/eye-off'
import { InputClear, InputControl, InputRoot, InputSuffix } from '@fex-design/solid/primitive/input'

function Password(props: { defaultValue?: string; toggle?: boolean; invalid?: boolean }) {
  const [visible, setVisible] = createSignal(false)
  return (
    <InputRoot defaultValue={props.defaultValue}>
      <InputControl
        type={visible() ? 'text' : 'password'}
        placeholder={props.toggle === false ? '无切换按钮' : undefined}
        aria-invalid={props.invalid || undefined}
      />
      {props.invalid && <InputClear />}
      {props.toggle !== false && (
        <InputSuffix>
          <button
            type="button"
            class={inputActionClassName}
            aria-label={visible() ? 'Hide password' : 'Show password'}
            aria-pressed={visible()}
            onClick={() => setVisible(!visible())}
          >
            {visible() ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </InputSuffix>
      )}
    </InputRoot>
  )
}
export function PasswordExample() {
  return (
    <div class="grid w-full gap-3">
      <Password defaultValue="secret" />
      <Password toggle={false} />
      <Password defaultValue="wrong-password" invalid />
    </div>
  )
}
