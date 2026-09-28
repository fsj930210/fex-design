import { Progress, ProgressRange, ProgressTrack } from '@fex-design/solid/primitive/progress'

export default function MultiRangeExample() {
  return (
    <div class="w-full max-w-md space-y-4">
      <Progress max={100}>
        <ProgressTrack class="h-3">
          <ProgressRange value={30} class="bg-primary" />
          <ProgressRange value={25} offset={30} class="bg-success" />
          <ProgressRange value={15} offset={55} class="bg-warning" />
        </ProgressTrack>
      </Progress>
    </div>
  )
}
