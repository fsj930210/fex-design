import { AspectRatio } from '../aspect-ratio'
import image from './aspect-ratio-demo.svg'

export function PortraitDemo() {
  return <AspectRatio ratio={9 / 16} className="max-w-48 rounded-md">
        <img
          src={image}
          alt="Mountain landscape"
          className="size-full object-cover"
        />
      </AspectRatio>
}
