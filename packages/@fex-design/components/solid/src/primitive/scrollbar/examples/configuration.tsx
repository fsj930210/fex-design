import { scrollbarConfigurationLines } from '@fex-design/docs-shared/scrollbar-demo'
import { For, createSignal } from 'solid-js'
import { InputNumber } from '@fex-design/solid/ui/input-number'
import { Select } from '@fex-design/solid/ui/select'
import { Checkbox } from '@fex-design/solid/ui/checkbox'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, type ScrollbarAutoHide } from '@fex-design/solid/primitive/scrollbar'

const modes = [{"value":"never","label":"持续显示"},{"value":"scroll","label":"滚动时显示"},{"value":"move","label":"移动时显示"},{"value":"leave","label":"离开后隐藏"}]

export function ScrollbarConfigurationExample() {
  const [mode, setMode] = createSignal<ScrollbarAutoHide>('scroll')
  const [delay, setDelay] = createSignal(600)
  const [disabled, setDisabled] = createSignal(false)
  const [top, setTop] = createSignal(0)
  function changeMode(value: unknown) { if (value === 'never' || value === 'scroll' || value === 'move' || value === 'leave') setMode(value) }
  return (
    <div class="grid w-full max-w-md gap-4">
      <div class="flex items-center gap-3"><span class="text-sm">自动隐藏</span><Select class="w-40" options={modes} value={mode()} onChange={changeMode} inputProps={{ 'aria-label': '自动隐藏模式' }} /></div>
      <div class="flex items-center gap-3"><span class="text-sm">隐藏延迟（ms）</span><InputNumber class="w-40" value={delay()} min={0} max={3000} step={100} onChange={(_event, value) => setDelay(value ?? 0)} /></div>
    <Checkbox checked={disabled()} onChange={(event) => setDisabled(event.currentTarget.checked)}>禁用自定义滚动条交互</Checkbox>
      <ScrollbarRoot class="h-48 w-72 rounded-md border" autoHide={mode()} disabled={disabled()} autoHideDelay={delay()} overflow={{ x: 'hidden' }} onScrollChange={(detail) => setTop(Math.round(detail.scrollTop))}>
        <ScrollbarViewport overflow={{ y: 'auto' }}>
          <div class="grid gap-3 p-4">
        <For each={scrollbarConfigurationLines}>{(line) => <p>{line}</p>}</For>
      </div>
        </ScrollbarViewport>
        <ScrollbarBar axis="y"><ScrollbarTrack axis="y"><ScrollbarThumb axis="y" class="bg-primary" /></ScrollbarTrack></ScrollbarBar>
      </ScrollbarRoot>
      <output>滚动位置： {top()}</output>
    </div>
  )
}
