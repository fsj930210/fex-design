import { Alert } from '@fex-design/react/ui/alert'

export default function Basic() {
  return (
    <div className="grid w-full gap-3">
      <Alert title="这是一条提示信息" />
      <Alert title="系统更新通知" description="系统将在今晚进行例行维护，请提前保存正在编辑的内容。" />
    </div>
  )
}
