export interface UsageItem {
  import: string
  code: string
}

export interface ComponentUsage {
  ui: UsageItem
  primitive: UsageItem
}

export const usageSnippetsPart1: Record<string, ComponentUsage> = {
  alert: {
    ui: {
      import: "import { Alert } from '@/components/ui/alert'",
      code: '<Alert type="info" title="消息提示" description="这是一条重要的提示信息。" />',
    },
    primitive: {
      import: "import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@/components/primitive/alert'",
      code: `<Alert type="info">
  <AlertIcon />
  <AlertTitle>消息提示</AlertTitle>
  <AlertDescription>这是一条重要的提示信息。</AlertDescription>
</Alert>`,
    },
  },
  anchor: {
    ui: {
      import: "import { Anchor } from '@/components/ui/anchor'",
      code: `<Anchor
  items={[
    { key: 'part-1', href: '#part-1', title: '快速上手' },
    { key: 'part-2', href: '#part-2', title: '进阶用法' },
  ]}
/>`,
    },
    primitive: {
      import: "import { AnchorRoot, AnchorRail, AnchorIndicator, AnchorList, AnchorItem, AnchorLink } from '@/components/primitive/anchor'",
      code: `<AnchorRoot>
  <AnchorRail><AnchorIndicator /></AnchorRail>
  <AnchorList>
    <AnchorItem value="#part-1"><AnchorLink href="#part-1">快速上手</AnchorLink></AnchorItem>
    <AnchorItem value="#part-2"><AnchorLink href="#part-2">进阶用法</AnchorLink></AnchorItem>
  </AnchorList>
</AnchorRoot>`,
    },
  },
  'aspect-ratio': {
    ui: {
      import: "import { AspectRatio } from '@/components/ui/aspect-ratio'",
      code: `<AspectRatio ratio={16 / 9}>
  <img src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&q=80" alt="封面" class="h-full w-full object-cover rounded-lg" />
</AspectRatio>`,
    },
    primitive: {
      import: "import { AspectRatio } from '@/components/primitive/aspect-ratio'",
      code: `<AspectRatio ratio={4 / 3} class="overflow-hidden rounded-md border border-border">
  <div class="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
    原子比例容器 (4:3)
  </div>
</AspectRatio>`,
    },
  },
  avatar: {
    ui: {
      import: "import { Avatar } from '@/components/ui/avatar'",
      code: '<Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&q=80" alt="用户头像" fallback="A" />',
    },
    primitive: {
      import: "import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from '@/components/primitive/avatar'",
      code: `<Avatar>
  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&q=80" alt="用户头像" />
  <AvatarFallback>A</AvatarFallback>
  <AvatarBadge class="bg-emerald-500" />
</Avatar>`,
    },
  },
  badge: {
    ui: {
      import: "import { Badge } from '@/components/ui/badge'",
      code: `<Badge count={5}>
  <div class="size-10 rounded-lg bg-muted" />
</Badge>`,
    },
    primitive: {
      import: "import { Badge, BadgeDot, BadgeRibbon } from '@/components/primitive/badge'",
      code: `<div class="flex items-center gap-4">
  <Badge count={99} color="primary" />
  <BadgeDot color="success" />
  <BadgeRibbon text="精选">
    <div class="p-4 border rounded-md">卡片视图</div>
  </BadgeRibbon>
</div>`,
    },
  },
  button: {
    ui: {
      import: "import { Button } from '@/components/ui/button'",
      code: '<Button color="primary" variant="solid">主操作按钮</Button>',
    },
    primitive: {
      import: "import { Button, ButtonIcon, ButtonGroup } from '@/components/primitive/button'",
      code: `<ButtonGroup>
  <Button variant="solid" color="primary">
    <ButtonIcon>+</ButtonIcon>
    新建任务
  </Button>
  <Button variant="outlined">查看列表</Button>
</ButtonGroup>`,
    },
  },
  card: {
    ui: {
      import: "import { Card } from '@/components/ui/card'",
      code: `<Card title="卡片标题" description="卡片副标题说明" extra={<button>更多</button>}>
  卡片主体展示内容
</Card>`,
    },
    primitive: {
      import: "import { Card, CardHeader, CardTitle, CardDescription, CardExtra, CardContent, CardFooter } from '@/components/primitive/card'",
      code: `<Card>
  <CardHeader>
    <CardTitle>卡片标题</CardTitle>
    <CardDescription>副标题信息</CardDescription>
    <CardExtra><button class="text-xs text-primary">操作</button></CardExtra>
  </CardHeader>
  <CardContent>卡片主体展示内容</CardContent>
  <CardFooter class="text-xs text-muted-foreground">更新于刚刚</CardFooter>
</Card>`,
    },
  },
  checkbox: {
    ui: {
      import: "import { Checkbox } from '@/components/ui/checkbox'",
      code: '<Checkbox defaultChecked>已阅读并同意服务协议</Checkbox>',
    },
    primitive: {
      import: "import { CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxLabel } from '@/components/primitive/checkbox'",
      code: `<CheckboxRoot defaultChecked>
  <CheckboxControl>
    <CheckboxIndicator />
  </CheckboxControl>
  <CheckboxLabel>已阅读并同意服务协议</CheckboxLabel>
</CheckboxRoot>`,
    },
  },
  empty: {
    ui: {
      import: "import { Empty } from '@/components/ui/empty'",
      code: '<Empty description="暂无相关数据" extra={<button>立即创建</button>} />',
    },
    primitive: {
      import: "import { Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@/components/primitive/empty'",
      code: `<Empty>
  <EmptyMedia />
  <EmptyTitle>暂无数据</EmptyTitle>
  <EmptyDescription>当前筛选条件下未检索到任何结果</EmptyDescription>
  <EmptyContent>
    <button class="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs">重新加载</button>
  </EmptyContent>
</Empty>`,
    },
  },
  input: {
    ui: {
      import: "import { Input } from '@/components/ui/input'",
      code: '<Input placeholder="请输入用户名..." allowClear />',
    },
    primitive: {
      import: "import { InputRoot, InputControl, InputPrefix, InputClear } from '@/components/primitive/input'",
      code: `<InputRoot>
  <InputPrefix class="text-muted-foreground">🔍</InputPrefix>
  <InputControl placeholder="输入关键字搜索..." />
  <InputClear />
</InputRoot>`,
    },
  },
  'input-number': {
    ui: {
      import: "import { InputNumber } from '@/components/ui/input-number'",
      code: '<InputNumber min={1} max={100} defaultValue={1} step={1} />',
    },
    primitive: {
      import: "import { InputNumberRoot, InputNumberControl, InputNumberActions, InputNumberIncrement, InputNumberDecrement } from '@/components/primitive/input-number'",
      code: `<InputNumberRoot min={1} max={100} defaultValue={1}>
  <InputNumberControl />
  <InputNumberActions>
    <InputNumberIncrement>+</InputNumberIncrement>
    <InputNumberDecrement>-</InputNumberDecrement>
  </InputNumberActions>
</InputNumberRoot>`,
    },
  },
  kbd: {
    ui: {
      import: "import { Kbd } from '@/components/ui/kbd'",
      code: '<Kbd>⌘ K</Kbd>',
    },
    primitive: {
      import: "import { Kbd, KbdGroup } from '@/components/primitive/kbd'",
      code: `<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>Shift</Kbd>
  <Kbd>P</Kbd>
</KbdGroup>`,
    },
  },
};
