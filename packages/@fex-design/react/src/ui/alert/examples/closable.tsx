import { Alert } from '@fex-design/react/ui/alert'

export default function Closable() {
  return (
    <div className="grid w-full gap-3">
      <Alert type="warning" showIcon closable title="这条提示可以关闭" />
      <Alert closable title="阻止默认关闭" description="关闭事件被阻止后保持显示。" onClose={(event) => event.preventDefault()} />
    </div>
  )
}
