import { Alert } from '@fex-design/react/ui/alert'
import type { CSSProperties } from 'react'

export default function Types() {
  return (
    <div className="grid w-full gap-3">
      <Alert type="success" showIcon title="操作成功" />
      <Alert type="info" showIcon title="信息提示" />
      <Alert type="warning" showIcon title="请注意当前配置" />
      <Alert type="error" showIcon title="操作失败" />
      <Alert type="info" showIcon title="自定义颜色" style={{ '--alert-color': '#7c3aed', '--alert-color-background': '#f5f3ff', '--alert-color-border': '#c4b5fd' } as CSSProperties} />
    </div>
  )
}
