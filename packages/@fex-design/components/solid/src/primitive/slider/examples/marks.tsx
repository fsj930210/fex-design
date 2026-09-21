import {
  SliderMark,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/solid/primitive/slider'
import { createMemo, createSignal, For } from 'solid-js'

function Demo(props: {
  values: number[]
  marks: number[]
  included?: boolean
  step?: number | null
  dots?: boolean
}) {
  return (
    <SliderRoot defaultValue={props.values} marks={props.marks} step={props.step}>
      <SliderTrack>
        {props.included !== false && <SliderRange />}
        {props.dots && (
          <For each={Array.from({ length: 11 }, (_, i) => i * 10)}>
            {(value) => <SliderMark value={value} aria-hidden="true" />}
          </For>
        )}
        <For each={props.marks}>
          {(value) => (
            <SliderMark value={value}>
              {value === props.marks[2] ? `建议 ${value}°C` : `${value}°C`}
            </SliderMark>
          )}
        </For>
      </SliderTrack>
      <For each={props.values}>
        {(_, index) => <SliderThumb index={index()} aria-label={`滑块 ${index() + 1}`} />}
      </For>
    </SliderRoot>
  )
}

export default function Example() {
  const [recommended, setRecommended] = createSignal(37)
  const marks = createMemo(() => [0, 26, recommended(), 100])
  return (
    <div class="grid w-full max-w-2xl gap-8 pb-6">
      <button onClick={() => setRecommended((value) => (value === 37 ? 60 : 37))}>
        将建议刻度移到 {recommended() === 37 ? 60 : 37}°C
      </button>
      <section class="grid gap-4">
        <h4>included=true（单值与范围）</h4>
        <Demo values={[37]} marks={marks()} />
        <Demo values={[26, 37]} marks={marks()} />
      </section>
      <section class="grid gap-4">
        <h4>included=false（刻度彼此独立）</h4>
        <Demo values={[37]} marks={marks()} included={false} />
      </section>
      <section class="grid gap-4">
        <h4>marks &amp; step（步长与刻度并存）</h4>
        <Demo values={[37]} marks={marks()} step={10} dots />
      </section>
      <section class="grid gap-4">
        <h4>step=null（只能落在标记点）</h4>
        <Demo values={[37]} marks={marks()} step={null} />
      </section>
    </div>
  )
}
