import { Input } from '@fex-design/react/ui/input'

export function ValidationExample() {
  return (
    <div className="grid w-full gap-2">
      <Input defaultValue="不完整的邮箱地址" aria-invalid="true" aria-describedby="email-error" />
      <p id="email-error" className="text-sm text-danger">
        请输入完整的邮箱地址。
      </p>
    </div>
  )
}
