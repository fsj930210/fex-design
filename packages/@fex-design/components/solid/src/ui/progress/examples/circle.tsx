import { Progress } from '@fex-design/solid/ui/progress'

export function ProgressCircleExample() {

  return (
    <div class="flex flex-wrap gap-4 items-center">
      <Progress variant="circle" value={30} size={96} showInfo />
      <Progress variant="circle" value={70} size={96} status="active" showInfo />
      <Progress variant="circle" value={100} size={96} status="success" showInfo />
      <Progress variant="circle" value={50} size={96} status="error" showInfo />
    </div>
  )
}
