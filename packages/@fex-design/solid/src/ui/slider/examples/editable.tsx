import { Slider } from '@fex-design/solid/ui/slider'
import { createSignal } from 'solid-js'
export default function Example() {
  const [values, setValues] = createSignal([20, 50, 80])
  return <div class="grid w-full max-w-xl gap-3"><Slider value={values()} editable minCount={2} maxCount={5} onChange={(next) => Array.isArray(next) && setValues(next)} /><p>当前节点：{values().join('、')}</p></div>
}
