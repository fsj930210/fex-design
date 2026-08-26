import { Card } from '../card'
export function BasicExample() {
  return (
    <Card
      class="w-full max-w-2xl [--card-border:1px_solid_var(--border)]"
      title={<strong class="text-lg font-semibold">登录账户</strong>}
      description="输入账户信息以继续访问控制台。"
      footer={
        <button class="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground">
          登录
        </button>
      }
    >
      <div class="grid gap-4">
        <label class="grid gap-1.5 font-medium">
          邮箱
          <input
            class="rounded-md border border-border bg-background px-3 py-2 font-normal"
            placeholder="name@example.com"
          />
        </label>
        <label class="grid gap-1.5 font-medium">
          密码
          <input class="rounded-md border border-border bg-background px-3 py-2" type="password" />
        </label>
      </div>
    </Card>
  )
}
