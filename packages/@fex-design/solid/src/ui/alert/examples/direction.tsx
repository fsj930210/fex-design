import { Alert } from '@fex-design/solid/ui/alert'
const items=[{dir:'ltr',title:'配置需要确认',action:'查看'},{dir:'rtl',title:'يجب تأكيد الإعداد',action:'عرض'}] as const
export default function Direction(){return <div class="grid w-full gap-6 sm:grid-cols-2">{items.map(item=><section dir={item.dir} class="grid gap-3 rounded-lg border p-4"><strong>{item.dir.toUpperCase()}</strong><Alert type="warning" showIcon closable title={item.title} action={<button class="underline">{item.action}</button>}/></section>)}</div>}
