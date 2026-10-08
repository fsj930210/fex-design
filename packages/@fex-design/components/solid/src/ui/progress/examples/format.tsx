import { Progress } from '@fex-design/solid/ui/progress'

export function ProgressFormatExample() {
  const formatStorage = (percent: number | null) => (percent ?? 0) + ' / 100 GB'
  return (
    <div class="grid w-full max-w-md gap-4">
      <Progress label="存储空间" value={72} infoPlacement="top" format={formatStorage} />
      <Progress label="处理中" value={48} infoPlacement="outside" showInfo />
      <Progress label="审核" value={84} infoPlacement="bottom" showInfo />
    </div>
  )
}
