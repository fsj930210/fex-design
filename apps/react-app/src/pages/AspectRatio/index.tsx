import { LandscapeDemo } from './landscape-demo'
import { PortraitDemo } from './portrait-demo'
import { SquareDemo } from './square-demo'
export function AspectRatioPage() {
  return (
    <main className="grid gap-4 p-2 md:p-6">
      <LandscapeDemo />
      <SquareDemo />
      <PortraitDemo />
    </main>
  )
}
