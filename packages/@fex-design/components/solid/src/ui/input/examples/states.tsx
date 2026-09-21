import { Input } from '@fex-design/solid/ui/input'
export function StatesExample() {
  return (
    <div class="grid w-full gap-3">
      <Input disabled defaultValue="禁用" />
      <Input readOnly defaultValue="只读" />
      <Input aria-invalid="true" defaultValue="输入有误" />
    </div>
  )
}
