import { Progress, ProgressRange, ProgressTrack, ProgressValue } from '@fex-design/react/primitive/progress'
import { CheckIcon } from '@fex-design/react/icons/check'

export function ProgressPrimitiveStatusExample() {
  return <div className="grid w-full max-w-md gap-3">{[
    ['pending', 0], ['active', 40], ['active', 60], ['success', 100], ['error', 80],
  ].map(([status, value], index) => <Progress key={`${status}-${index}`} value={value} status={status as 'pending' | 'active' | 'success' | 'error'} className="flex w-full flex-col"><div className="flex w-full items-center"><ProgressTrack className="min-w-0 flex-1"><ProgressRange /></ProgressTrack><ProgressValue className="ms-2 shrink-0 text-sm font-medium">{status === 'success' ? <span className="inline-flex size-4 items-center justify-center rounded-full bg-success text-[10px] text-white"><CheckIcon className="size-3" /></span> : `${value}%`}</ProgressValue></div></Progress>)}</div>
}
