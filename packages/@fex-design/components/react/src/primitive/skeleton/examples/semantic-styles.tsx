import { SkeletonAvatar, SkeletonText } from '@fex-design/react/primitive/skeleton'
export function SkeletonSemanticStylesExample() {
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton-root"
      className="flex w-full items-start gap-3 rounded-xl border border-dashed border-primary p-5"
    >
      <div className="shrink-0">
        <SkeletonAvatar size="lg" className="bg-blue-300" style={{ width: 56, height: 56 }} />
      </div>
      <div className="grid min-w-0 flex-1">
        <SkeletonText className="mb-4 bg-blue-400" style={{ width: '45%', height: 20 }} />
        <div className="grid gap-2">
          <SkeletonText className="bg-blue-200" />
          <SkeletonText className="bg-blue-200" />
          <SkeletonText className="bg-blue-200" style={{ width: '70%' }} />
        </div>
      </div>
    </div>
  )
}
