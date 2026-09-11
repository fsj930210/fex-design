import { Alert, AlertAction, AlertIcon, AlertTitle } from '@fex-design/solid/primitive/alert'
import { TriangleAlertIcon } from '@fex-design/solid/icon/triangle-alert'
import { XIcon } from '@fex-design/solid/icon/x'
import { alertCloseClassName } from '@fex-design/styles/alert'
const items = [
  { dir: 'ltr', title: '配置需要确认', action: '查看' },
  { dir: 'rtl', title: 'يجب تأكيد الإعداد', action: 'عرض' },
] as const
export default function Direction() {
  return (
    <div class="grid w-full gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <section dir={item.dir} class="grid gap-3 rounded-lg border p-4">
          <strong>{item.dir.toUpperCase()}</strong>
          <Alert type="warning">
            <AlertIcon>
              <TriangleAlertIcon />
            </AlertIcon>
            <AlertTitle>{item.title}</AlertTitle>
            <AlertAction>
              <button class="underline">{item.action}</button>
            </AlertAction>
            <button class={alertCloseClassName} data-slot="alert-close" aria-label="关闭提示">
              <XIcon />
            </button>
          </Alert>
        </section>
      ))}
    </div>
  )
}
