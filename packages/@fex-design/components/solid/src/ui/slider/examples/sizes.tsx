import { Slider } from '@fex-design/solid/ui/slider'
export default function Example() {
  return (
    <div class="grid w-full max-w-xl gap-6">
      <Slider size="sm" defaultValue={25} />
      <Slider size="md" defaultValue={50} />
      <Slider size="lg" defaultValue={75} />
    </div>
  )
}
