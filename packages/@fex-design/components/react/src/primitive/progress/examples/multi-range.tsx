import { Progress, ProgressRange, ProgressTrack } from '@fex-design/react/primitive/progress'

export default function MultiRangeExample() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Progress max={100} className="w-full">
        <ProgressTrack className="h-3">
          <ProgressRange value={30} className="bg-primary" />
          <ProgressRange value={25} offset={30} className="bg-success" />
          <ProgressRange value={15} offset={55} className="bg-warning" />
        </ProgressTrack>
      </Progress>
    </div>
  )
}
