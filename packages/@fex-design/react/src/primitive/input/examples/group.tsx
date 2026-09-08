import { InputControl, InputGroup, InputRoot } from '@fex-design/react/primitive/input'
import { Button } from '@fex-design/react/primitive/button'
export function GroupExample() {
  return (
    <div className="grid w-full gap-3">
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
