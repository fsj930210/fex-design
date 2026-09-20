import { Select } from '@fex-design/solid/ui/select'
const items=[{value:'react',label:'React'},{value:'vue',label:'Vue'}]
export default function Example(){return <Select class="w-72" items={items} defaultValue="react" placeholder="请选择框架" clearable/>}

