import { SkeletonAvatar, SkeletonText } from '@fex-design/react/primitive/skeleton'
export function SkeletonCssVariablesExample() {
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton-root"
      className="flex w-full items-start gap-3 rounded-xl border border-dashed border-primary p-5 [--skeleton-gradient-from:#ede9fe] [--skeleton-gradient-to:#a78bfa] [--avatar-size-lg:56px] [--primary:#7c3aed]"
    >
      <div className="shrink-0">
        <SkeletonAvatar animation="wave" size="lg" className="" />
      </div>
      <div className="grid min-w-0 flex-1">
        <SkeletonText animation="wave" className="mb-4" style={{ width: '45%' }} />
        <div className="grid gap-2">
          <SkeletonText animation="wave" className="" />
          <SkeletonText animation="wave" className="" />
          <SkeletonText animation="wave" className="" style={{ width: '70%' }} />
        </div>
      </div>
    </div>
  )
}
