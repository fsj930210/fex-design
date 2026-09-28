import {
  Progress,
  ProgressRange,
  ProgressTrack,
  ProgressValue,
} from '@fex-design/react/primitive/progress'

export default function CustomStyleExample() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Progress value={85} className="w-full">
        <ProgressTrack className="h-4 rounded-md bg-muted">
          <ProgressRange className="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        </ProgressTrack>
        <div className="mt-1 text-right">
          <ProgressValue className="text-xs font-mono text-muted-foreground">85%</ProgressValue>
        </div>
      </Progress>
    </div>
  )
}
