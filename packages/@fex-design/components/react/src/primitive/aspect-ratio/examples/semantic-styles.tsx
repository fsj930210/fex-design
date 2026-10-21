import { AspectRatio } from '@fex-design/react/primitive/aspect-ratio'
import image from './aspect-ratio-demo.svg'

export function AspectRatioSemanticStylesExample() {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="overflow-hidden rounded-xl border-4 border-[var(--border)] max-w-2xl rounded-md border-violet-300 text-violet-900"
    >
      <img src={image} alt="Mountain landscape" className="size-full object-cover" />
    </AspectRatio>
  )
}
