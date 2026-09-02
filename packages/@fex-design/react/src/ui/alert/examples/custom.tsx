import { Alert } from '@fex-design/react/ui/alert'
import { StarIcon } from '@fex-design/react/icon/star'

export default function Custom() {
  return (
    <div className="w-full max-w-sm">
      <Alert
        type="success"
        showIcon
        closable
        icon={<StarIcon />}
        title="Long alert title wraps to multiple lines when the alert container is narrow enough."
        action={<button className="underline">Action</button>}
      />
    </div>
  )
}
