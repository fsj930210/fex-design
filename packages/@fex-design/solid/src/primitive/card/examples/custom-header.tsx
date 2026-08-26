import { Card, CardContent, CardDescription, CardExtra, CardHeader, CardTitle } from '../card'
export function CustomHeaderExample() {
  return (
    <Card class="w-full max-w-2xl [--card-border:1px_solid_var(--border)]">
      <CardHeader class="bg-slate-950">
        <CardTitle class="text-lg font-bold text-white">Analytics Pro</CardTitle>
        <CardDescription class="text-slate-300">团队数据分析工作区</CardDescription>
        <CardExtra>
          <button class="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-slate-950">
            管理订阅
          </button>
        </CardExtra>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <strong class="text-2xl">24.8k</strong>
            <p class="text-sm text-muted-foreground">月活用户</p>
          </div>
          <div>
            <strong class="text-2xl">18.2%</strong>
            <p class="text-sm text-muted-foreground">转化率</p>
          </div>
          <div>
            <strong class="text-2xl">99.9%</strong>
            <p class="text-sm text-muted-foreground">可用性</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
