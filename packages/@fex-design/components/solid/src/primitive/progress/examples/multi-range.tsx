import { Progress, ProgressRange, ProgressTrack } from '@fex-design/solid/primitive/progress'

export function ProgressPrimitiveMultiRangeExample() {
  return <div class="grid w-full max-w-md gap-3">
    <Progress value={70} thickness={12} class="flex w-full flex-col">
      <div class="mb-1.5 flex w-full justify-between text-sm"><span class="font-medium text-foreground">任务分布</span><span class="text-muted-foreground">已分配 70%</span></div>
      <ProgressTrack>
        <ProgressRange value={30} offset={0} style={{ background: 'var(--primary)', 'border-radius': '0' }} />
        <ProgressRange value={25} offset={30} style={{ background: 'var(--success)', 'border-radius': '0' }} />
        <ProgressRange value={15} offset={55} style={{ background: 'var(--warning)', 'border-radius': '0' }} />
      </ProgressTrack>
    </Progress>
    <div class="flex gap-4 text-sm"><span>已完成 30%</span><span>处理中 25%</span><span>待审核 15%</span></div>
  </div>
}
