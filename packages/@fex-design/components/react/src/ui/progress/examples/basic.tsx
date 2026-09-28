import { Progress } from "@fex-design/react/ui/progress"

export function ProgressBasicExample() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <Progress label="Upload progress" value={35} infoPlacement="top" />
      <Progress value={65} />
    </div>
  )
}
