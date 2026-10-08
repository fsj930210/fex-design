import { Progress, ProgressTrack, ProgressRange, ProgressValue } from '@fex-design/react/primitive/progress'

export function ProgressPrimitiveLinecapExample() {
  return <div className="grid w-full max-w-md gap-3">
      <div className="flex items-center gap-3"><span className="w-12 text-sm text-muted-foreground">直角</span>
        <Progress value={50} className="flex flex-1 flex-col"><div className="flex w-full items-center"><ProgressTrack className="min-w-0 flex-1" style={{ borderRadius: 0 }}><ProgressRange style={{ borderRadius: 0 }} /></ProgressTrack><ProgressValue className="ms-2 shrink-0 text-sm font-medium">50%</ProgressValue></div></Progress>
      </div>
      <div className="flex items-center gap-3"><span className="w-12 text-sm text-muted-foreground">小圆角</span>
        <Progress value={50} className="flex flex-1 flex-col"><div className="flex w-full items-center"><ProgressTrack className="min-w-0 flex-1" style={{ borderRadius: 2 }}><ProgressRange style={{ borderRadius: 2 }} /></ProgressTrack><ProgressValue className="ms-2 shrink-0 text-sm font-medium">50%</ProgressValue></div></Progress>
      </div>
      <div className="flex items-center gap-3"><span className="w-12 text-sm text-muted-foreground">胶囊</span>
        <Progress value={50} className="flex flex-1 flex-col"><div className="flex w-full items-center"><ProgressTrack className="min-w-0 flex-1" style={{ borderRadius: 9999 }}><ProgressRange style={{ borderRadius: 9999 }} /></ProgressTrack><ProgressValue className="ms-2 shrink-0 text-sm font-medium">50%</ProgressValue></div></Progress>
      </div>
  </div>
}
