import { Progress } from '@fex-design/react/ui/progress'

export function ProgressLinecapExample() {
  return <div className="grid w-full max-w-md gap-3">
      <div className="flex items-center gap-3"><span className="w-12 text-sm text-muted-foreground">直角</span>
        <Progress value={50} className="flex-1" styles={{ track: { borderRadius: 0 }, range: { borderRadius: 0 } }} />
      </div>
      <div className="flex items-center gap-3"><span className="w-12 text-sm text-muted-foreground">小圆角</span>
        <Progress value={50} className="flex-1" styles={{ track: { borderRadius: 2 }, range: { borderRadius: 2 } }} />
      </div>
      <div className="flex items-center gap-3"><span className="w-12 text-sm text-muted-foreground">胶囊</span>
        <Progress value={50} className="flex-1" styles={{ track: { borderRadius: 9999 }, range: { borderRadius: 9999 } }} />
      </div>
  </div>
}
