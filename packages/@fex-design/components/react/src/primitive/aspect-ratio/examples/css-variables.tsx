import { AspectRatio } from '@fex-design/react/primitive/aspect-ratio'
import image from './aspect-ratio-demo.svg'

export function AspectRatioCssVariablesExample() {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="overflow-hidden rounded-xl border-4 border-[var(--border)] max-w-2xl rounded-md [--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
    >
      <img src={image} alt="Mountain landscape" className="size-full object-cover" />
    </AspectRatio>
  )
}
