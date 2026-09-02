import { Alert, AlertAction, AlertIcon, AlertTitle } from '@fex-design/react/primitive/alert'
import { CircleWarningIcon } from '@fex-design/react/icon/circle-warning'
import { CloseIcon } from '@fex-design/react/icon/close'
import { alertCloseClassName } from '@fex-design/styles/alert'

const items = [
  { dir: 'ltr', title: '配置需要确认', action: '查看' },
  { dir: 'rtl', title: 'يجب تأكيد الإعداد', action: 'عرض' },
] as const

export default function Direction() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <section key={item.dir} dir={item.dir} className="grid gap-3 rounded-lg border p-4">
          <strong>{item.dir.toUpperCase()}</strong>
          <Alert type="warning">
            <AlertIcon><CircleWarningIcon /></AlertIcon>
            <AlertTitle>{item.title}</AlertTitle>
            <AlertAction><button className="underline">{item.action}</button></AlertAction>
            <button className={alertCloseClassName} data-slot="alert-close" aria-label="关闭提示"><CloseIcon /></button>
          </Alert>
        </section>
      ))}
    </div>
  )
}
