import { SkeletonImage, SkeletonText } from '@fex-design/react/primitive/skeleton'
export default function Example() { return <div className="flex w-full max-w-xl items-start gap-4"><SkeletonImage className="h-28 w-40 shrink-0" /><div className="grid min-w-0 flex-1 gap-3"><SkeletonText className="w-2/5" /><SkeletonText /><SkeletonText /><SkeletonText className="w-4/5" /></div></div> }
