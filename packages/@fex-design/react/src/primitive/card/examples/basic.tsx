import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@fex-design/react/primitive/card'

export function BasicExample() {
  return (
    <Card className="w-full max-w-2xl [--card-border:1px_solid_var(--border)]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">登录账户</CardTitle>
        <CardDescription>输入账户信息以继续访问控制台。</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <label className="grid gap-1.5 font-medium">
            邮箱
            <input
              className="rounded-md border border-border bg-background px-3 py-2 font-normal"
              placeholder="name@example.com"
            />
          </label>
          <label className="grid gap-1.5 font-medium">
            密码
            <input
              className="rounded-md border border-border bg-background px-3 py-2"
              type="password"
            />
          </label>
        </div>
      </CardContent>
      <CardFooter>
        <button className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground">
          登录
        </button>
      </CardFooter>
    </Card>
  )
}
