import { AspectRatio } from '@fex-design/solid/primitive/aspect-ratio'
export function AspectRatioSemanticStylesExample() {
  return (
    <AspectRatio
      class="overflow-hidden rounded-xl border-4 border-[var(--border)] border-violet-300 text-violet-900"
      ratio={16 / 9}
    >
      <img src="/aspect-ratio-demo.svg" alt="Mountain landscape" class="size-full object-cover" />
    </AspectRatio>
  )
}
