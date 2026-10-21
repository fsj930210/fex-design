import { scrollbarConfigurationLines } from '@fex-design/docs-shared/scrollbar-demo'
import { useState } from 'react'
import { InputNumber } from '@fex-design/react/ui/input-number'
import { Select } from '@fex-design/react/ui/select'
import { Checkbox } from '@fex-design/react/ui/checkbox'
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
  type ScrollbarAutoHide,
} from '@fex-design/react/primitive/scrollbar'

const modes = [
  { value: 'never', label: '持续显示' },
  { value: 'scroll', label: '滚动时显示' },
  { value: 'move', label: '移动时显示' },
  { value: 'leave', label: '离开后隐藏' },
]

export function ScrollbarConfigurationExample() {
  const [mode, setMode] = useState<ScrollbarAutoHide>('scroll')
  const [delay, setDelay] = useState(600)
  const [disabled, setDisabled] = useState(false)
  const [top, setTop] = useState(0)
  function changeMode(value: unknown) {
    if (value === 'never' || value === 'scroll' || value === 'move' || value === 'leave')
      setMode(value)
  }
  return (
    <div className="grid w-full max-w-md gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm">自动隐藏</span>
        <Select
          className="w-40"
          options={modes}
          value={mode}
          onChange={changeMode}
          inputProps={{ 'aria-label': '自动隐藏模式' }}
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm">隐藏延迟（ms）</span>
        <InputNumber
          className="w-40"
          value={delay}
          min={0}
          max={3000}
          step={100}
          onChange={(_event, value) => setDelay(value ?? 0)}
        />
      </div>
      <Checkbox checked={disabled} onChange={(event) => setDisabled(event.currentTarget.checked)}>
        禁用自定义滚动条交互
      </Checkbox>
      <ScrollbarRoot
        className="h-48 w-72 rounded-md border"
        autoHide={mode}
        disabled={disabled}
        autoHideDelay={delay}
        overflow={{ x: 'hidden' }}
        onScrollChange={(detail) => setTop(Math.round(detail.scrollTop))}
      >
        <ScrollbarViewport overflow={{ y: 'auto' }}>
          <div className="grid gap-3 p-4">
            {scrollbarConfigurationLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </ScrollbarViewport>
        <ScrollbarBar axis="y">
          <ScrollbarTrack axis="y">
            <ScrollbarThumb axis="y" className="bg-primary" />
          </ScrollbarTrack>
        </ScrollbarBar>
      </ScrollbarRoot>
      <output>滚动位置： {top}</output>
    </div>
  )
}
