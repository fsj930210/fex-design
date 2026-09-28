import { Progress } from "@fex-design/solid/ui/progress"

export default function StepLineExample() {
  return (
    <div class="grid w-full max-w-md gap-3">
      <Progress value={60} steps={5} color="var(--info)" />
      <Progress value={100} steps={5} color="var(--success)" success />
    </div>
  )
}
