import { SkeletonAvatar, SkeletonText } from '@fex-design/solid/primitive/skeleton'
export function SkeletonCssVariablesExample() {
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton-root"
      class="flex w-full items-start gap-3 rounded-xl border border-dashed border-primary p-5 [--skeleton-gradient-from:#ede9fe] [--skeleton-gradient-to:#a78bfa] [--avatar-size-lg:56px] [--primary:#7c3aed]"
    >
      <div class="shrink-0">
        <SkeletonAvatar animation="wave" size="lg" class="" />
      </div>
      <div class="grid min-w-0 flex-1">
        <SkeletonText animation="wave" class="mb-4" style={{ width: '45%' }} />
        <div class="grid gap-2">
          <SkeletonText animation="wave" class="" />
          <SkeletonText animation="wave" class="" />
          <SkeletonText animation="wave" class="" style={{ width: '70%' }} />
        </div>
      </div>
    </div>
  )
}
