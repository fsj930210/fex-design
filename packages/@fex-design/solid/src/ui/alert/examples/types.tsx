import { Alert } from '@fex-design/solid/ui/alert'
const items=[['success','操作成功'],['info','信息提示'],['warning','请注意当前配置'],['error','操作失败']] as const
export default function Types(){return <div class="grid w-full gap-3">{items.map(([type,title])=><Alert type={type} showIcon title={title}/>)}<Alert showIcon title="自定义颜色" style={{'--alert-color':'#7c3aed','--alert-color-background':'#f5f3ff','--alert-color-border':'#c4b5fd'}}/></div>}
