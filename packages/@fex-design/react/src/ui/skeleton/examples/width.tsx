import { Skeleton } from '@fex-design/react/ui/skeleton'
export default function Example() { return <div className="grid w-full max-w-xl gap-8"><Skeleton avatar title={{ width: '35%' }} paragraph={{ rows: 4, width: ['100%','90%','75%','55%'] }} /><Skeleton title={{ width: 180 }} paragraph={{ rows: 4, width: '60%' }} /></div> }
