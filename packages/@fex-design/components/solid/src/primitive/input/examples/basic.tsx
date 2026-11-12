import { InputClear, InputControl, InputRoot } from '@fex-design/solid/primitive/input'
export function BasicExample(props: { invalid?: boolean }) {
  return (
    <div class="grid w-full gap-3">
      <InputRoot aria-invalid={props.invalid}>
        <InputControl placeholder="请输入内容" />
      </InputRoot>
      <InputRoot aria-invalid={props.invalid} defaultValue="可清除内容">
        <InputControl />
        <InputClear />
      </InputRoot>
    </div>
  )
}
