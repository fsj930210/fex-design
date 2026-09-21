import { Input, InputGroup } from '@fex-design/solid/ui/input'
import { Button } from '@fex-design/solid/ui/button'
export function GroupExample() {
  return (
    <div class="grid w-full gap-3">
      <InputGroup>
        <Input placeholder="关键词" />
        <Button>提交</Button>
      </InputGroup>
      <InputGroup>
        <Input defaultValue="010" />
        <Input placeholder="电话号码" />
      </InputGroup>
    </div>
  )
}
