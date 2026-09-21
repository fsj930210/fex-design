import { SelectContent,SelectRoot,SelectTrigger } from '@fex-design/solid/primitive/select'
const items=Array.from({length:1000},(_,index)=>({value:index,label:`项目 ${index+1}`}))
export default function Example(){return <SelectRoot items={items} showSearch virtual={{itemHeight:32,overscan:4}}><SelectTrigger class="w-72" placeholder="搜索项目"/><SelectContent/></SelectRoot>}

