import { InputControl, InputRoot } from '@fex-design/react/primitive/input'

export function ValidationExample() {
  return (
    <div className="grid w-full gap-2">
      <InputRoot defaultValue="不完整的邮箱地址">
        <InputControl aria-invalid="true" aria-describedby="email-error" />
      </InputRoot>
      <p id="email-error" className="text-sm text-danger">
        请输入完整的邮箱地址。
      </p>
    </div>
  )
}
