import { createSignal } from 'solid-js'
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@fex-design/solid/primitive/alert'
import { TriangleAlertIcon } from '@fex-design/solid/icon/triangle-alert'
import { XIcon } from '@fex-design/solid/icon/x'
import { alertCloseClassName } from '@fex-design/styles/alert'
export default function Closable() {
  const [visible, setVisible] = createSignal(true)
  return (
    <div class="grid w-full gap-3">
      {visible() ? (
        <Alert type="warning">
          <AlertIcon>
            <TriangleAlertIcon />
          </AlertIcon>
          <AlertTitle>这条提示可以关闭</AlertTitle>
          <button
            class={alertCloseClassName}
            data-slot="alert-close"
            aria-label="关闭提示"
            onClick={() => setVisible(false)}
          >
            <XIcon />
          </button>
        </Alert>
      ) : (
        <button onClick={() => setVisible(true)}>重新显示</button>
      )}
      <Alert>
        <AlertTitle>阻止默认关闭</AlertTitle>
        <AlertDescription>关闭事件被阻止后保持显示。</AlertDescription>
        <button
          class={alertCloseClassName}
          data-slot="alert-close"
          aria-label="关闭提示"
          onClick={(event) => event.preventDefault()}
        >
          <XIcon />
        </button>
      </Alert>
    </div>
  )
}
