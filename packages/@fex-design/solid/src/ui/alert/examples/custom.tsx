import { Alert } from '@fex-design/solid/ui/alert'; import { StarIcon } from '@fex-design/solid/icon/star'
export default function Custom(){return <div class="w-full max-w-sm"><Alert type="success" showIcon closable icon={<StarIcon/>} title="Long alert title wraps to multiple lines when the alert container is narrow enough." action={<button>Action</button>}/></div>}
