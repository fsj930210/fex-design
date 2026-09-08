import { InputControl, InputGroup, InputRoot } from '@fex-design/solid/primitive/input'
import { Button } from '@fex-design/solid/primitive/button'
export function GroupExample() {
  return (
    <div class="grid w-full gap-3">
      <InputGroup>
        <InputRoot>
          <InputControl placeholder="关键词" />
        </InputRoot>
        <Button>提交</Button>
      </InputGroup>
      <InputGroup>
        <InputRoot defaultValue="010">
          <InputControl />
        </InputRoot>
        <InputRoot>
          <InputControl placeholder="电话号码" />
        </InputRoot>
      </InputGroup>
    </div>
  )
}
