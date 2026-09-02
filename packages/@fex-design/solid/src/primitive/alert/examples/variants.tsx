import { Alert, AlertIcon, AlertTitle } from '@fex-design/solid/primitive/alert'
import { CircleInfoIcon } from '@fex-design/solid/icon/circle-info'
const variants=[['filled','Filled Alert'],['outlined','Outlined Alert'],['solid','Solid Alert']] as const
export default function Variants(){return <div class="grid w-full gap-3">{variants.map(([variant,title])=><Alert variant={variant}><AlertIcon><CircleInfoIcon/></AlertIcon><AlertTitle>{title}</AlertTitle></Alert>)}</div>}
