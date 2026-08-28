import { AspectRatio } from '../aspect-ratio'
import image from './aspect-ratio-demo.svg'

export function LandscapeDemo() {
  return <AspectRatio ratio={16 / 9} className="max-w-2xl rounded-md">
        <img
          src={image}
          alt="Mountain landscape"
          className="size-full object-cover"
        />
      </AspectRatio>
}
