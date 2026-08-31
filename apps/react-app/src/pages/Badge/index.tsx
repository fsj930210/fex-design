import { Badge, BadgeGroup, BadgeRibbon } from '@fex-design/react/primitive/badge'
import { Card } from '@fex-design/react/ui/card'
import { Link } from 'react-router'

const colors = ['default', 'primary', 'info', 'success', 'warning', 'danger'] as const

export function BadgePage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-2">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">Badge</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Use badges for compact status, category, and count labels.
          </p>
        </header>
        <div className="grid gap-4">
          <Card title="Colors" description="用颜色表达徽标的语义状态。">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              {colors.map((color) => (
                <Badge key={color} color={color}>
                  {color}
                </Badge>
              ))}
            </div>
          </Card>
          <Card title="Group" description="使用 maxCount 收起过多的标签。">
            <BadgeGroup maxCount={3}>
              {['Design', 'Frontend', 'Backend', 'QA', 'Operations'].map((item) => (
                <Badge key={item} color="info">
                  {item}
                </Badge>
              ))}
            </BadgeGroup>
          </Card>
          <Card title="Ribbon" description="Ribbon 适合附着在卡片等容器边缘。">
            <BadgeRibbon text="推荐" color="primary">
              <Card title="推荐方案" description="Ribbon 保留完整的 Primitive 能力。" />
            </BadgeRibbon>
          </Card>
        </div>
      </div>
    </main>
  )
}
