import { SelectContent,SelectRoot,SelectTrigger } from '@fex-design/solid/primitive/select'
const items=[{value:'react',label:'React'},{value:'vue',label:'Vue'}]
export default function Example(){return <SelectRoot items={items} defaultValue="react"><SelectTrigger class="w-72" placeholder="请选择框架"/><SelectContent/></SelectRoot>}

