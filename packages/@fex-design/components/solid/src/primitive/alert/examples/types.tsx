import { Alert, AlertIcon, AlertTitle } from '@fex-design/solid/primitive/alert'
import { CircleCheckIcon } from '@fex-design/solid/icons/circle-check'
import { CircleXIcon } from '@fex-design/solid/icons/circle-x'
import { InfoIcon } from '@fex-design/solid/icons/info'
import { TriangleAlertIcon } from '@fex-design/solid/icons/triangle-alert'
const items = [
  ['success', '操作成功', CircleCheckIcon],
  ['info', '信息提示', InfoIcon],
  ['warning', '请注意当前配置', TriangleAlertIcon],
  ['error', '操作失败', CircleXIcon],
] as const
export default function Types() {
  return (
    <div class="grid w-full gap-3">
      {items.map(([type, title, Icon]) => (
        <Alert type={type}>
          <AlertIcon>
            <Icon />
          </AlertIcon>
          <AlertTitle>{title}</AlertTitle>
        </Alert>
      ))}
      <Alert
        style={{
          '--alert-color': '#7c3aed',
          '--alert-color-background': '#f5f3ff',
          '--alert-color-border': '#c4b5fd',
        }}
      >
        <AlertIcon>
          <InfoIcon />
        </AlertIcon>
        <AlertTitle>自定义颜色</AlertTitle>
      </Alert>
    </div>
  )
}
