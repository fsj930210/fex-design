import { Progress } from "@fex-design/react/ui/progress"

export function ProgressStatusExample() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <Progress value={0} status="pending" />
      <Progress value={40} status="active" />
      <Progress value={60} status="active" />
      <Progress value={100} status="success" />
      <Progress value={80} status="error" />
    </div>
  )
}
