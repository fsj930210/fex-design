import { InputControl, InputRoot } from '@fex-design/solid/primitive/input'
export function StatesExample() {
  return (
    <div class="grid w-full gap-3">
      <InputRoot disabled defaultValue="禁用">
        <InputControl />
      </InputRoot>
      <InputRoot readOnly defaultValue="只读">
        <InputControl />
      </InputRoot>
      <InputRoot defaultValue="输入有误">
        <InputControl aria-invalid="true" />
      </InputRoot>
    </div>
  )
}
