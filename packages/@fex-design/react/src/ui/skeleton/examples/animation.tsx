import { SkeletonAvatar, SkeletonButton, SkeletonText } from '@fex-design/react/ui/skeleton'
const modes = [['none','无动画'],['pulse','呼吸'],['wave','流光']] as const
export default function Example() { return <div className="grid gap-5">{modes.map(([animation,label]) => <div key={animation} className="grid gap-2"><b>{label}</b><div className="flex items-center gap-3"><SkeletonAvatar animation={animation} /><SkeletonText animation={animation} className="w-48" /><SkeletonButton animation={animation} /></div></div>)}</div> }
