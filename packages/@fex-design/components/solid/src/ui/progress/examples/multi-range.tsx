import { Progress } from '@fex-design/solid/ui/progress'

export function ProgressMultiRangeExample() {
  return <div class="grid w-full max-w-md gap-3">
    <Progress ranges={[{ value: 30, color: 'var(--primary)' }, { value: 25, color: 'var(--success)' }, { value: 15, color: 'var(--warning)' }]} thickness={12} label="任务分布" infoPlacement="top" format={() => '已分配 70%'} />
    <div class="flex gap-4 text-sm"><span>已完成 30%</span><span>处理中 25%</span><span>待审核 15%</span></div>
  </div>
}
