import { Progress } from "@fex-design/react/ui/progress"

export function ProgressDirectionExample() {
  return (
    <div className="grid w-full max-w-md gap-5">
      <div dir="ltr"><Progress value={65} label="LTR" infoPlacement="top" /></div>
      <div dir="rtl"><Progress value={65} label="RTL" infoPlacement="top" /></div>
      <div className="flex items-start gap-6"><div dir="ltr" className="grid justify-items-center gap-1 text-sm"><Progress variant="circle" value={65} size={96} showInfo /><span>LTR（顺时针）</span></div><div dir="rtl" className="grid justify-items-center gap-1 text-sm"><Progress variant="circle" value={65} size={96} showInfo classNames={{ track: "scale-x-[-1]" }} /><span>RTL（反向）</span></div></div>
    </div>
  )
}
