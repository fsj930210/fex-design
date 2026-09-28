import { Progress } from "@fex-design/solid/ui/progress"

export default function LinecapExample() {
  return (
    <div class="grid w-full max-w-md gap-3">
      <Progress value={50} linecap="round" trackLinecap="round" />
      <Progress value={50} linecap="butt" trackLinecap="butt" />
      <Progress value={50} linecap="square" trackLinecap="square" />
    </div>
  )
}
