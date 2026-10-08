import { AspectRatio } from '..'
export function Landscape() {
  return (
    <AspectRatio ratio={16 / 9}>
      <img src="/aspect-ratio-demo.svg" alt="Mountain landscape" class="size-full object-cover" />
    </AspectRatio>
  )
}
