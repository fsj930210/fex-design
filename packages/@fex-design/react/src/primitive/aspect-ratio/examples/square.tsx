import { AspectRatio } from '../aspect-ratio'
import image from './aspect-ratio-demo.svg'

export function SquareDemo() {
  return (
    <AspectRatio ratio={1} className="max-w-64 rounded-md">
      <img src={image} alt="Mountain landscape" className="size-full object-cover" />
    </AspectRatio>
  )
}
