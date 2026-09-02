import { Alert, AlertIcon, AlertTitle } from '@fex-design/solid/primitive/alert'
import { CircleCheckIcon } from '@fex-design/solid/icon/circle-check'
import { CircleErrorIcon } from '@fex-design/solid/icon/circle-error'
import { CircleInfoIcon } from '@fex-design/solid/icon/circle-info'
import { CircleWarningIcon } from '@fex-design/solid/icon/circle-warning'
const items=[['success','操作成功',CircleCheckIcon],['info','信息提示',CircleInfoIcon],['warning','请注意当前配置',CircleWarningIcon],['error','操作失败',CircleErrorIcon]] as const
export default function Types(){return <div class="grid w-full gap-3">{items.map(([type,title,Icon])=><Alert type={type}><AlertIcon><Icon/></AlertIcon><AlertTitle>{title}</AlertTitle></Alert>)}<Alert style={{'--alert-color':'#7c3aed','--alert-color-background':'#f5f3ff','--alert-color-border':'#c4b5fd'}}><AlertIcon><CircleInfoIcon/></AlertIcon><AlertTitle>自定义颜色</AlertTitle></Alert></div>}
