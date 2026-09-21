import { Input } from '@fex-design/react/ui/input'
export function BasicExample() {
  return (
    <div className="grid w-full gap-3">
      <Input placeholder="请输入内容" />
      <Input defaultValue="可清除内容" clearable />
    </div>
  )
}
