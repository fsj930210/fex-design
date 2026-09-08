import { InputClear, InputControl, InputRoot } from '@fex-design/react/primitive/input'
export function BasicExample() {
  return (
    <div className="grid w-full gap-3">
      <InputRoot>
        <InputControl placeholder="请输入内容" />
      </InputRoot>
      <InputRoot defaultValue="可清除内容">
        <InputControl />
        <InputClear />
      </InputRoot>
    </div>
  )
}
