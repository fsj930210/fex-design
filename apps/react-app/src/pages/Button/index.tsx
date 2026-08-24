import { Button as PrimitiveButton } from '@fex-design/react/primitive/button'
import { Card } from '@fex-design/react/ui/card'
import { Button, ButtonGroup } from '@fex-design/react/ui/button'
import { PlusIcon } from '@fex-design/react/icon/plus'
import type { ReactNode } from 'react'
import { Link } from 'react-router'

const variants = [
  'default',
  'outline',
  'secondary',
  'ghost',
  'destructive',
  'link',
  'dashed',
] as const
const sizes = ['xs', 'sm', 'default', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] as const
const effects = [
  'expand-icon',
  'ring-hover',
  'shine-hover',
  'gooey-start',
  'gooey-end',
  'underline',
  'hover-underline',
  'press',
] as const

function DemoSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <Card title={title} description={description}>
      <div className="flex min-w-0 flex-wrap items-center gap-2">{children}</div>
    </Card>
  )
}

export function ButtonPage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-4">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            返回首页
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Button</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              用于触发页面操作、表单提交和工具栏命令。示例覆盖样式、尺寸、加载、图标、效果、组合和禁用状态。
            </p>
          </div>
        </header>

        <div className="grid gap-4">
          <Card title="Primitive" description="按钮底层骨架与最小行为。">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <PrimitiveButton>Primitive button</PrimitiveButton>
            </div>
          </Card>

          <Card title="Button group" description="Groups related actions without owning their value.">
            <div className="flex flex-wrap items-start gap-3">
              <ButtonGroup><Button variant="outline">Previous</Button><Button variant="outline">Current</Button><Button variant="outline">Next</Button></ButtonGroup>
              <ButtonGroup spacing={8}><Button>Save</Button><Button>Publish</Button></ButtonGroup>
              <ButtonGroup orientation="vertical"><Button variant="outline">Move up</Button><Button variant="outline">Move down</Button></ButtonGroup>
            </div>
          </Card>

          <Card title="Ui" description="面向业务的默认按钮封装。">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              {variants.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant}
                </Button>
              ))}
            </div>
          </Card>

          <DemoSection title="Variants" description="按钮的基础视觉语义。">
            {variants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </DemoSection>

          <DemoSection title="Sizes" description="文本按钮和 icon-only 按钮尺寸。">
            {sizes.map((size) => (
              <Button
                key={size}
                size={size}
                aria-label={size.startsWith('icon') ? size : undefined}
              >
                {size.startsWith('icon') ? <PlusIcon /> : size}
              </Button>
            ))}
          </DemoSection>

          <DemoSection
            title="Loading"
            description="加载态会禁用按钮，loading icon 跟随 iconPlacement。"
          >
            <Button loading>Loading start</Button>
            <Button loading iconPlacement="end">
              Loading end
            </Button>
          </DemoSection>

          <DemoSection title="Icon" description="业务图标可放在文字前或文字后。">
            <Button icon={<PlusIcon />}>Icon start</Button>
            <Button icon={<PlusIcon />} iconPlacement="end">
              Icon end
            </Button>
          </DemoSection>

          <DemoSection title="Effects" description="单独展示适合基础按钮使用的视觉效果。">
            {effects.map((effect) => (
              <Button
                key={effect}
                effect={effect}
                icon={effect === 'expand-icon' ? <PlusIcon /> : undefined}
                iconPlacement="end"
              >
                {effect}
              </Button>
            ))}
          </DemoSection>

          <DemoSection
            title="Mixed Usage"
            description="不同 variant、icon、loading 和 effect 的组合。"
          >
            <Button effect="expand-icon" icon={<PlusIcon />} iconPlacement="end">
              Icon right
            </Button>
            <Button effect="expand-icon" icon={<PlusIcon />}>
              Icon left
            </Button>
            <Button variant="secondary" effect="gooey-start">
              Secondary gooey start
            </Button>
            <Button variant="destructive" effect="gooey-end">
              Destructive gooey end
            </Button>
            <Button variant="destructive" effect="press">
              Pressed feedback
            </Button>
            <Button variant="outline" effect="ring-hover">
              Outline ring hover
            </Button>
            <Button variant="link" effect="hover-underline">
              Link hover underline
            </Button>
            <Button variant="link" effect="underline">
              Link underline
            </Button>
            <Button variant="outline" effect="hover-underline">
              Outline hover underline
            </Button>
            <Button variant="outline" effect="underline">
              Outline underline
            </Button>
            <Button variant="destructive" loading>
              Destructive loading
            </Button>
            <Button loading iconPlacement="end">
              Loading with icon
            </Button>
          </DemoSection>

          <DemoSection title="Disabled" description="禁用态和不同 variant 的组合。">
            <Button disabled>Disabled</Button>
            <Button disabled variant="outline">
              Disabled outline
            </Button>
          </DemoSection>
        </div>
      </div>
    </main>
  )
}
