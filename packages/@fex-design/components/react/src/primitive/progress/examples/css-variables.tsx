import {
  Progress,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
  ProgressValue,
} from '@fex-design/react/primitive/progress'

export function ProgressCssVariablesExample() {
  return (
    <div className="w-full max-w-md grid gap-4">
      <Progress
        value={35}
        className="flex w-full flex-col [--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
      >
        <div className="flex w-full items-center justify-between text-sm mb-1.5">
          <ProgressLabel className="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]">
            Upload progress
          </ProgressLabel>
          <ProgressValue className="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]">
            35%
          </ProgressValue>
        </div>
        <div className="flex w-full items-center">
          <ProgressTrack className="min-w-0 flex-1 [--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]">
            <ProgressRange className="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]" />
          </ProgressTrack>
        </div>
      </Progress>
      <Progress
        value={65}
        className="flex w-full flex-col [--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
      >
        <div className="flex w-full items-center">
          <ProgressTrack className="min-w-0 flex-1 [--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]">
            <ProgressRange className="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]" />
          </ProgressTrack>
          <ProgressValue className="ms-2 shrink-0 text-sm font-medium [--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]">
            65%
          </ProgressValue>
        </div>
      </Progress>
    </div>
  )
}
