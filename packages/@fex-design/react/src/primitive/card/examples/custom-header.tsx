import {
  Card,
  CardContent,
  CardDescription,
  CardExtra,
  CardHeader,
  CardTitle,
} from '@fex-design/react/primitive/card'

export function CustomHeaderExample() {
  return (
    <Card className="w-full max-w-2xl [--card-border:1px_solid_var(--border)]">
      <CardHeader className="bg-slate-950">
        <CardTitle className="text-lg font-bold text-white">Analytics Pro</CardTitle>
        <CardDescription className="text-slate-300">团队数据分析工作区</CardDescription>
        <CardExtra>
          <button className="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-slate-950">
            管理订阅
          </button>
        </CardExtra>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <strong className="text-2xl">24.8k</strong>
            <p className="text-sm text-muted-foreground">月活用户</p>
          </div>
          <div>
            <strong className="text-2xl">18.2%</strong>
            <p className="text-sm text-muted-foreground">转化率</p>
          </div>
          <div>
            <strong className="text-2xl">99.9%</strong>
            <p className="text-sm text-muted-foreground">可用性</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
