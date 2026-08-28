import {
  Spinner,
  SpinnerContainer,
  SpinnerOverlay,
  SpinnerText,
} from '@fex-design/react/primitive/spinner'
import { useState } from 'react'

export function OverlayExample() {
  const [spinning, setSpinning] = useState(true)
  return (
    <div className="grid w-full max-w-xl gap-4">
      <SpinnerContainer className="min-h-40 rounded-lg border border-border">
        <div className="grid gap-2 p-6">
          <strong>项目概览</strong>
          <p className="m-0 text-sm text-muted-foreground">
            内容在加载期间保持挂载，不会丢失布局和状态。
          </p>
        </div>
        {spinning && (
          <SpinnerOverlay>
            <Spinner />
            <SpinnerText>正在刷新数据</SpinnerText>
          </SpinnerOverlay>
        )}
      </SpinnerContainer>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
          onClick={() => setSpinning((value) => !value)}
        >
          {spinning ? '停止加载' : '开始加载'}
        </button>
        <span className="text-sm text-muted-foreground">spinning: {String(spinning)}</span>
      </div>
    </div>
  )
}
