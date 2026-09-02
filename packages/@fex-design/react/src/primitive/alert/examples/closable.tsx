import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@fex-design/react/primitive/alert'
import { alertCloseClassName } from '@fex-design/styles/alert'
import { CloseIcon } from '@fex-design/react/icon/close'
import { CircleWarningIcon } from '@fex-design/react/icon/circle-warning'
import { useState } from 'react'

export default function Closable() {
  const [visible, setVisible] = useState(true)
  return (
    <div className="grid w-full gap-3">
      {visible ? (
        <Alert type="warning">
          <AlertIcon><CircleWarningIcon /></AlertIcon>
          <AlertTitle>这条提示可以关闭</AlertTitle>
          <button className={alertCloseClassName} data-slot="alert-close" aria-label="关闭提示" onClick={() => setVisible(false)}><CloseIcon /></button>
        </Alert>
      ) : <button onClick={() => setVisible(true)}>重新显示</button>}
      <Alert>
        <AlertTitle>阻止默认关闭</AlertTitle>
        <AlertDescription>关闭事件被阻止后保持显示。</AlertDescription>
        <button className={alertCloseClassName} data-slot="alert-close" aria-label="关闭提示" onClick={(event) => event.preventDefault()}><CloseIcon /></button>
      </Alert>
    </div>
  )
}
