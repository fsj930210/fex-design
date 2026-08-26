import { Card } from '../card'
export function ExtraExample() {
  return (
    <Card
      className="w-full max-w-2xl [--card-border:1px_solid_var(--border)]"
      title={<strong className="text-lg font-semibold">生产环境</strong>}
      description="新加坡 · 最近部署于 3 分钟前"
      extra={
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-semibold text-emerald-700">运行中</span>
        </div>
      }
    >Extra 与标题说明独立，可放状态、操作或补充信息。</Card>
  )
}
