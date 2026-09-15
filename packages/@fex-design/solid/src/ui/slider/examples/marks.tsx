import { Slider } from '@fex-design/solid/ui/slider'
import { createMemo, createSignal } from 'solid-js'

export default function Example() {
  const [recommended, setRecommended] = createSignal(37)
  const marks = createMemo(() => [
    { value: 0, label: '0°C' },
    { value: 26, label: '26°C' },
    { value: recommended(), label: `建议 ${recommended()}°C` },
    { value: 100, label: '100°C' },
  ])
  return (
    <div class="grid w-full max-w-2xl gap-8 pb-6">
      <button onClick={() => setRecommended((value) => (value === 37 ? 60 : 37))}>将建议刻度移到 {recommended() === 37 ? 60 : 37}°C</button>
      <section class="grid gap-6"><h4>included=true</h4><div class="grid gap-3"><p>单值</p><Slider defaultValue={37} marks={marks()} /></div><div class="grid gap-3"><p>范围</p><Slider defaultValue={[26, 37]} marks={marks()} /></div></section>
      <section class="grid gap-4"><h4>included=false（刻度彼此独立）</h4><Slider defaultValue={37} marks={marks()} included={false} /></section>
      <section class="grid gap-4"><h4>marks &amp; step（步长与刻度并存）</h4><Slider defaultValue={37} marks={marks()} dots step={10} /></section>
      <section class="grid gap-4"><h4>step=null（只能落在标记点）</h4><Slider defaultValue={37} marks={marks()} step={null} /></section>
    </div>
  )
}
