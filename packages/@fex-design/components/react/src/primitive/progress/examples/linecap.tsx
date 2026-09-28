import {
  Progress,
  ProgressRange,
  ProgressTrack,
  ProgressValue,
} from '@fex-design/react/primitive/progress'
const caps = [
  { name: 'round', label: '圆角', radius: 9999 },
  { name: 'butt', label: '平截', radius: 0 },
  { name: 'square', label: '方角', radius: 2, boxShadow: '4px 0 0 currentColor' },
]
export function ProgressPrimitiveLinecapExample() {
  return (
    <div className="grid w-full max-w-md gap-3">
      {caps.map(({ name, label, radius, boxShadow }) => (
        <div key={name} className="flex items-center gap-3">
          <span className="w-8 text-sm text-muted-foreground">{label}</span>
          <Progress value={50} className="flex flex-1 flex-col">
            <div className="flex w-full items-center">
              <ProgressTrack style={{ borderRadius: radius }} className="min-w-0 flex-1">
                <ProgressRange style={{ borderRadius: radius, boxShadow }} />
              </ProgressTrack>
              <ProgressValue className="ms-2 shrink-0 text-sm font-medium">50%</ProgressValue>
            </div>
          </Progress>
        </div>
      ))}
    </div>
  )
}
