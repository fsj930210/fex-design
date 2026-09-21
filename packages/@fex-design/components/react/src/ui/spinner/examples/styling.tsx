import { SpinnerContainer } from '@fex-design/react/ui/spinner'

export function StylingExample() {
  return (
    <SpinnerContainer
      spinning
      text="蓝色文本"
      className="min-h-32 rounded-md border border-border"
      classNames={{
        overlay: 'bg-amber-100/95',
        spinner: 'text-fuchsia-600',
        text: 'font-bold text-blue-600',
      }}
      styles={{ overlay: { outline: '3px dashed #f97316' } }}
    >
      <div className="p-6 text-slate-500">灰色内容区域</div>
    </SpinnerContainer>
  )
}
