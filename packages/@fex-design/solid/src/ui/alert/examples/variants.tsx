import { Alert } from '@fex-design/solid/ui/alert'
const variants=[['filled','Filled Alert'],['outlined','Outlined Alert'],['solid','Solid Alert']] as const
export default function Variants(){return <div class="grid w-full gap-3">{variants.map(([variant,title])=><Alert variant={variant} showIcon title={title}/>)}</div>}
