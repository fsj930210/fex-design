import { Progress } from "@fex-design/react/ui/progress"

const gradient = { from: "#1677ff", to: "#87d068" }
export function ProgressGradientExample() {
  return <div className="grid w-full max-w-md gap-4"><Progress value={90} color={gradient} /><div className="flex items-center gap-6"><Progress variant="circle" value={90} size={96} color={gradient} showInfo /><Progress variant="dashboard" value={90} size={96} color={gradient} showInfo /></div></div>
}
