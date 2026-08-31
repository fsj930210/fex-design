import { Card } from '@fex-design/react/ui/card'

export function DirectionExample() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      {(['ltr', 'rtl'] as const).map((dir) => (
        <Card
          key={dir}
          dir={dir}
          title={dir.toUpperCase()}
          description="Header 与 Footer 按逻辑方向排列。"
          extra={<button className="rounded-md border px-3 py-1.5 text-sm">操作</button>}
          footer={
            <button className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground">
              保存
            </button>
          }
        >
          内容区域保持可读顺序。
        </Card>
      ))}
    </div>
  )
}
