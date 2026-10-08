import type { ComponentUsage } from "./usage-snippets-part1"

export const usageSnippetsPart2: Record<string, ComponentUsage> = {
  popover: {
    ui: {
      import: "import { Popover } from '@/components/ui/popover'",
      code: `<Popover trigger={<button>打开气泡卡片</button>}>
  <div class="p-4 space-y-2">
    <h4 class="font-medium text-sm">气泡面板标题</h4>
    <p class="text-xs text-muted-foreground">这里是气泡卡片的提示详情与操作区域。</p>
  </div>
</Popover>`,
    },
    primitive: {
      import: "import { PopoverRoot, PopoverTrigger, PopoverContent, PopoverClose } from '@/components/primitive/popover'",
      code: `<PopoverRoot>
  <PopoverTrigger><button class="px-3 py-1.5 border rounded-md text-xs">打开浮层</button></PopoverTrigger>
  <PopoverContent class="p-4 rounded-lg border bg-popover shadow-md">
    <div class="text-sm font-semibold">自定义浮层内容</div>
    <PopoverClose class="mt-2 text-xs text-muted-foreground">关闭</PopoverClose>
  </PopoverContent>
</PopoverRoot>`,
    },
  },
  progress: {
    ui: {
      import: "import { Progress } from '@/components/ui/progress'",
      code: '<Progress value={65} showInfo status="active" />',
    },
    primitive: {
      import: "import { ProgressRoot, ProgressTrack, ProgressRange, ProgressValue } from '@/components/primitive/progress'",
      code: `<ProgressRoot value={65}>
  <ProgressTrack>
    <ProgressRange />
  </ProgressTrack>
  <ProgressValue class="text-xs text-muted-foreground" />
</ProgressRoot>`,
    },
  },
  radio: {
    ui: {
      import: "import { Radio, RadioGroup } from '@/components/ui/radio'",
      code: `<RadioGroup defaultValue="apple">
  <Radio value="apple">苹果</Radio>
  <Radio value="banana">香蕉</Radio>
</RadioGroup>`,
    },
    primitive: {
      import: "import { RadioGroup, Radio, RadioButton } from '@/components/primitive/radio'",
      code: `<RadioGroup defaultValue="1" class="flex gap-2">
  <RadioButton value="1">按钮选项 1</RadioButton>
  <RadioButton value="2">按钮选项 2</RadioButton>
  <Radio value="3">常规单选 3</Radio>
</RadioGroup>`,
    },
  },
  select: {
    ui: {
      import: "import { Select } from '@/components/ui/select'",
      code: `<Select
  options={[
    { label: 'React 框架', value: 'react' },
    { label: 'Solid 框架', value: 'solid' },
    { label: 'Vue 框架', value: 'vue' },
  ]}
  placeholder="请选择技术栈"
/>`,
    },
    primitive: {
      import: "import { SelectRoot, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/primitive/select'",
      code: `<SelectRoot>
  <SelectTrigger>
    <SelectValue placeholder="请选择框架" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="react">React 框架</SelectItem>
    <SelectItem value="solid">Solid 框架</SelectItem>
    <SelectItem value="vue">Vue 框架</SelectItem>
  </SelectContent>
</SelectRoot>`,
    },
  },
  separator: {
    ui: {
      import: "import { Separator } from '@/components/ui/separator'",
      code: '<Separator />',
    },
    primitive: {
      import: "import { Separator } from '@/components/primitive/separator'",
      code: `<div class="space-y-3">
  <div>上部内容区域</div>
  <Separator orientation="horizontal" class="my-2" />
  <div class="flex h-5 items-center space-x-3 text-xs">
    <span>文档</span>
    <Separator orientation="vertical" />
    <span>源码</span>
    <Separator orientation="vertical" />
    <span>日志</span>
  </div>
</div>`,
    },
  },
  skeleton: {
    ui: {
      import: "import { Skeleton } from '@/components/ui/skeleton'",
      code: `<div class="space-y-2">
  <Skeleton class="h-6 w-1/3" />
  <Skeleton class="h-4 w-full" />
  <Skeleton class="h-4 w-4/5" />
</div>`,
    },
    primitive: {
      import: "import { SkeletonAvatar, SkeletonText, SkeletonButton, SkeletonBlock } from '@/components/primitive/skeleton'",
      code: `<div class="flex items-center gap-3">
  <SkeletonAvatar size="md" />
  <div class="flex-1 space-y-1.5">
    <SkeletonText lines={2} />
    <SkeletonButton size="sm" />
  </div>
</div>`,
    },
  },
  slider: {
    ui: {
      import: "import { Slider } from '@/components/ui/slider'",
      code: '<Slider defaultValue={40} min={0} max={100} />',
    },
    primitive: {
      import: "import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from '@/components/primitive/slider'",
      code: `<SliderRoot defaultValue={40} min={0} max={100}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb />
</SliderRoot>`,
    },
  },
  spinner: {
    ui: {
      import: "import { Spinner, SpinnerContainer } from '@/components/ui/spinner'",
      code: `<SpinnerContainer spinning={loading} text="数据加载中...">
  <div class="p-6 border rounded-lg bg-card">卡片主数据视图</div>
</SpinnerContainer>`,
    },
    primitive: {
      import: "import { Spinner, SpinnerContainer, SpinnerOverlay, SpinnerText } from '@/components/primitive/spinner'",
      code: `<SpinnerContainer class="relative">
  <SpinnerOverlay class="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
    <Spinner size="lg" />
    <SpinnerText class="mt-2 text-xs text-muted-foreground">正在同步资源...</SpinnerText>
  </SpinnerOverlay>
  <div class="p-6 border rounded-lg">被遮罩覆盖的内容层</div>
</SpinnerContainer>`,
    },
  },
  switch: {
    ui: {
      import: "import { Switch } from '@/components/ui/switch'",
      code: '<Switch defaultChecked checkedChildren="已开启" unCheckedChildren="已关闭" />',
    },
    primitive: {
      import: "import { SwitchRoot, SwitchThumb, SwitchLabel } from '@/components/primitive/switch'",
      code: `<div class="flex items-center gap-2">
  <SwitchRoot defaultChecked id="notify-switch">
    <SwitchThumb />
  </SwitchRoot>
  <SwitchLabel for="notify-switch">启用桌面实时推送通知</SwitchLabel>
</div>`,
    },
  },
  tag: {
    ui: {
      import: "import { Tag } from '@/components/ui/tag'",
      code: '<Tag color="primary" closable onClose={() => console.log("closed")}>高阶标签</Tag>',
    },
    primitive: {
      import: "import { Tag, TagAction } from '@/components/primitive/tag'",
      code: `<Tag color="primary" variant="filled">
  <span>解构原子标签</span>
  <TagAction onClick={handleClose}>×</TagAction>
</Tag>`,
    },
  },
  tooltip: {
    ui: {
      import: "import { Tooltip } from '@/components/ui/tooltip'",
      code: `<Tooltip content="这是开箱即用的气泡提示信息">
  <button class="px-3 py-1.5 border rounded-md text-xs">鼠标悬停查看</button>
</Tooltip>`,
    },
    primitive: {
      import: "import { TooltipRoot, TooltipTrigger, TooltipContent, TooltipArrow } from '@/components/primitive/tooltip'",
      code: `<TooltipRoot>
  <TooltipTrigger>
    <button class="px-3 py-1.5 border rounded-md text-xs">解构触发点</button>
  </TooltipTrigger>
  <TooltipContent class="p-2 rounded-md bg-popover text-popover-foreground text-xs shadow-md">
    <TooltipArrow />
    这是通过原子部件组装的浮层说明
  </TooltipContent>
</TooltipRoot>`,
    },
  },
}
