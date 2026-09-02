import { Alert, AlertAction, AlertIcon, AlertTitle } from '@fex-design/react/primitive/alert'
import { StarIcon } from '@fex-design/react/icon/star'
import { CloseIcon } from '@fex-design/react/icon/close'
import { alertCloseClassName } from '@fex-design/styles/alert'
import { useState } from 'react'

export default function Custom() {
  const [visible, setVisible] = useState(true)
  return visible ? (
    <div className="w-full max-w-sm">
      <Alert type="success">
        <AlertIcon aria-hidden="true"><StarIcon /></AlertIcon>
        <AlertTitle>Long alert title wraps to multiple lines when the alert container is narrow enough.</AlertTitle>
        <AlertAction><button className="underline">Action</button></AlertAction>
        <button className={alertCloseClassName} data-slot="alert-close" aria-label="关闭提示" onClick={() => setVisible(false)}><CloseIcon /></button>
      </Alert>
    </div>
  ) : null
}
