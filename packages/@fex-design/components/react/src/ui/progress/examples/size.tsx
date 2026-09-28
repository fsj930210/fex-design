import { Progress } from "@fex-design/react/ui/progress"

export function ProgressSizeExample() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <Progress value={30} thickness={4} />
      <Progress value={50} thickness={8} />
      <Progress value={70} thickness={12} />
    </div>
  )
}
