import { Progress } from '@fex-design/solid/ui/progress'

export function ProgressColorExample() {

  return (
    <div class="grid w-full max-w-md gap-4">
      <Progress value={45} color="#7c3aed" trackColor="#cffafe" />
      <Progress value={75} color={{"from":"#1677ff","to":"#87d068","direction":"to right"}} />
      <div class="flex gap-4">
        <Progress variant="circle" value={60} size={96} color="#7c3aed" showInfo />
      </div>
    </div>
  )
}
