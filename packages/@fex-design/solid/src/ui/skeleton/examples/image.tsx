import { SkeletonImage, SkeletonText } from '@fex-design/solid/ui/skeleton'
export default () => <div class="flex w-full max-w-xl items-start gap-4"><SkeletonImage class="h-28 w-40 shrink-0" /><div class="grid min-w-0 flex-1 gap-3"><SkeletonText class="w-2/5" /><SkeletonText /><SkeletonText /><SkeletonText class="w-4/5" /></div></div>
