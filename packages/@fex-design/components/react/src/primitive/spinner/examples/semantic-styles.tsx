import {
  SpinnerContainer,
  SpinnerOverlay,
  Spinner,
  SpinnerText,
} from '@fex-design/react/primitive/spinner'

export function SpinnerSemanticStylesExample() {
  return (
    <SpinnerContainer className="min-h-32 rounded-md border border-border" aria-busy="true">
      <div className="p-6 text-slate-500">灰色内容区域</div>
      <SpinnerOverlay className="bg-amber-100/95" style={{ outline: '3px dashed #f97316' }}>
        <Spinner className="text-fuchsia-600"></Spinner>
        <SpinnerText className="font-bold text-blue-600">蓝色文本</SpinnerText>
      </SpinnerOverlay>
    </SpinnerContainer>
  )
}
