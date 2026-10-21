import { Skeleton } from '@fex-design/react/ui/skeleton'
export function SkeletonCssVariablesExample() {
  return (
    <Skeleton
      animation="wave"
      avatar={{ size: 'lg' }}
      title={{ width: '45%' }}
      paragraph={{ rows: 3, width: '70%' }}
      className="rounded-xl border border-dashed border-primary p-5 [--skeleton-gradient-from:#ede9fe] [--skeleton-gradient-to:#a78bfa] [--avatar-size-lg:56px] [--primary:#7c3aed]"
    />
  )
}
