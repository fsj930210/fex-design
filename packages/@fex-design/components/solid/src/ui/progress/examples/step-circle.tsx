import { Progress } from "@fex-design/solid/ui/progress"

export default function StepCircleExample() {
  return (
    <div class="flex gap-6 items-center">
      <Progress variant="circle" value={60} steps={10} gap={2} color="var(--info)" showInfo />
      <Progress variant="circle" value={100} steps={10} gap={2} color="var(--success)" success showInfo />
    </div>
  )
}
