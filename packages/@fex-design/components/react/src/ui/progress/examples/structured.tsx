import { Progress } from "@fex-design/react/ui/progress"

export function ProgressStructuredExample() {
  return (
    <div className="grid w-full max-w-xl gap-6">
      <Progress value={72} label="上传文件" infoPlacement="top" className="w-full" classNames={{ label: "font-semibold", info: "text-violet-600", track: "h-3 rounded-md", range: "rounded-md" }} styles={{ range: { background: "linear-gradient(90deg, #6366f1, #a855f7)" } }} />
      <div className="flex items-center gap-6">
        <Progress variant="circle" value={72} size={96} showInfo classNames={{ root: "rounded-full bg-muted/30 p-2", range: "text-violet-600" }} />
        <Progress variant="dashboard" value={72} size={96} gapDegree={90} showInfo classNames={{ root: "rounded-full bg-muted/30 p-2", range: "text-violet-600" }} />
      </div>
    </div>
  )
}
