import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@fex-design/react/primitive/alert'
import { alertCloseClassName } from '@fex-design/components-styles/alert'
import { XIcon } from '@fex-design/react/icons/x'
import { TriangleAlertIcon } from '@fex-design/react/icons/triangle-alert'
import { useState } from 'react'

export default function Closable() {
  const [visible, setVisible] = useState(true)
  return (
    <div className="grid w-full gap-3">
      {visible ? (
        <Alert type="warning">
          <AlertIcon>
            <TriangleAlertIcon />
          </AlertIcon>
          <AlertTitle>这条提示可以关闭</AlertTitle>
          <button
            className={alertCloseClassName}
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
          className={alertCloseClassName}
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
