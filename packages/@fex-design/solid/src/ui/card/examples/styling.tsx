import { Card } from '../card'
export function StylingExample() {
  return (
    <Card
      title={<strong class="text-lg font-bold text-white">季度增长</strong>}
      description="Header、Content、Footer 使用明显不同的颜色。"
      extra={
        <span class="rounded-full bg-white/20 px-2 py-1 text-xs font-semibold text-white">
          +28.4%
        </span>
      }
      footer={
        <button class="rounded-md bg-amber-950 px-3 py-1.5 font-semibold text-amber-50">
          查看报告
        </button>
      }
      classNames={{
        root: 'w-full max-w-2xl',
        header: 'bg-violet-600',
        description: 'text-violet-100',
        content: 'bg-violet-50 text-violet-950',
        footer: 'justify-end bg-amber-300',
      }}
      styles={{ content: { padding: '2rem' } }}
    >
      Header、Content、Footer 使用明显不同的颜色，便于观察每个语义区域的覆盖边界。
    </Card>
  )
}
