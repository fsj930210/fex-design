import { Progress } from "@fex-design/react/ui/progress"

export function ProgressLinecapExample() {
  const caps = [
    { label: "圆角", linecap: "round", trackLinecap: "round" },
    { label: "平截", linecap: "butt", trackLinecap: "butt" },
    { label: "方角", linecap: "square", trackLinecap: "square" },
  ] as const
  return (
    <div className="grid w-full max-w-md gap-3">
      {caps.map(({ label, linecap, trackLinecap }) => (
        <div key={linecap} className="flex items-center gap-3">
          <span className="w-8 text-sm text-muted-foreground">{label}</span>
          <Progress value={50} linecap={linecap} trackLinecap={trackLinecap} className="flex-1" />
        </div>
      ))}
    </div>
  )
}
