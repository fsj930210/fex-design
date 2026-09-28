import { Progress } from "@fex-design/react/ui/progress"

export function ProgressFormatExample() {
  return <div className="grid w-full max-w-md gap-4"><Progress label="存储空间" value={72} infoPlacement="top" format={(percent) => `${percent ?? 0} / 100 GB`} /><Progress label="处理中" value={48} infoPlacement="outside" showInfo /><Progress label="审核" value={84} infoPlacement="bottom" showInfo /></div>
}
