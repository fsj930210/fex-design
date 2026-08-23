import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/solid/primitive/slider'
import { Card } from '@fex-design/solid/ui/card'
import { A } from '@solidjs/router'
import { createSignal } from 'solid-js'

export function SliderPage() {
  const [basicValue, setBasicValue] = createSignal([32])
  const [controlledValue, setControlledValue] = createSignal([48])
  const [rangeValue, setRangeValue] = createSignal([20, 80])
  const [multipleValue, setMultipleValue] = createSignal([15, 45, 75])

  return (
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-5xl space-y-4">
        <header class="space-y-4">
          <A class="text-sm text-muted-foreground hover:text-foreground" href="/">
            Back home
          </A>
          <div>
            <h1 class="text-2xl font-semibold text-foreground">Slider</h1>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Primitive slider with shared core value logic.
            </p>
          </div>
        </header>
        <div class="space-y-4">
          <Card title="Basic" description="Uncontrolled slider uses defaultValue.">
            <div class="grid gap-1.5">
              <SliderRoot defaultValue={[32]} aria-label="Volume" onValueChange={setBasicValue}>
                <SliderTrack>
                  <SliderRange />
                </SliderTrack>
                <SliderThumb aria-label="Volume" />
              </SliderRoot>
              <p class="text-sm text-muted-foreground">Current value: {basicValue().join(', ')}</p>
            </div>
          </Card>
          <Card title="Controlled" description="Controlled slider uses value and onValueChange.">
            <div class="grid gap-1.5">
              <SliderRoot
                value={controlledValue()}
                onValueChange={setControlledValue}
                aria-label="Controlled slider"
              >
                <SliderTrack>
                  <SliderRange />
                </SliderTrack>
                <SliderThumb aria-label="Controlled slider" />
              </SliderRoot>
              <p class="text-sm text-muted-foreground">
                Current value: {controlledValue().join(', ')}
              </p>
            </div>
          </Card>
          <Card title="Range" description="Use an array with two values for a range slider.">
            <div class="grid gap-1.5">
              <SliderRoot
                defaultValue={[20, 80]}
                minStepsBetweenThumbs={4}
                aria-label="Range slider"
                onValueChange={setRangeValue}
              >
                <SliderTrack>
                  <SliderRange />
                </SliderTrack>
                <SliderThumb index={0} aria-label="Minimum value" />
                <SliderThumb index={1} aria-label="Maximum value" />
              </SliderRoot>
              <p class="text-sm text-muted-foreground">Current value: {rangeValue().join(', ')}</p>
            </div>
          </Card>
          <Card
            title="Multiple Thumbs"
            description="Use more than two values to create multiple thumbs."
          >
            <div class="grid gap-1.5">
              <SliderRoot
                defaultValue={[15, 45, 75]}
                minStepsBetweenThumbs={4}
                aria-label="Multiple thumbs slider"
                onValueChange={setMultipleValue}
              >
                <SliderTrack>
                  <SliderRange />
                </SliderTrack>
                <SliderThumb index={0} aria-label="First value" />
                <SliderThumb index={1} aria-label="Second value" />
                <SliderThumb index={2} aria-label="Third value" />
              </SliderRoot>
              <p class="text-sm text-muted-foreground">
                Current value: {multipleValue().join(', ')}
              </p>
            </div>
          </Card>
          <Card
            title="Orientation"
            description="Slider supports horizontal and vertical orientation."
          >
            <div class="flex items-center gap-4">
              <div class="w-full max-w-md">
                <SliderRoot defaultValue={[45]} aria-label="Horizontal slider">
                  <SliderTrack>
                    <SliderRange />
                  </SliderTrack>
                  <SliderThumb aria-label="Horizontal slider" />
                </SliderRoot>
              </div>
              <SliderRoot orientation="vertical" defaultValue={[60]} aria-label="Vertical slider">
                <SliderTrack>
                  <SliderRange />
                </SliderTrack>
                <SliderThumb aria-label="Vertical slider" />
              </SliderRoot>
            </div>
          </Card>
          <Card title="Sizes" description="Slider supports sm, default, and lg sizes.">
            <div class="grid gap-2">
              <SliderRoot size="sm" defaultValue={[25]} aria-label="Small slider">
                <SliderTrack>
                  <SliderRange />
                </SliderTrack>
                <SliderThumb aria-label="Small slider" />
              </SliderRoot>
              <SliderRoot defaultValue={[50]} aria-label="Default slider">
                <SliderTrack>
                  <SliderRange />
                </SliderTrack>
                <SliderThumb aria-label="Default slider" />
              </SliderRoot>
              <SliderRoot size="lg" defaultValue={[75]} aria-label="Large slider">
                <SliderTrack>
                  <SliderRange />
                </SliderTrack>
                <SliderThumb aria-label="Large slider" />
              </SliderRoot>
            </div>
          </Card>
          <Card title="Disabled" description="Disabled state blocks input.">
            <div class="grid gap-1.5">
              <SliderRoot disabled defaultValue={[60]} aria-label="Disabled slider">
                <SliderTrack>
                  <SliderRange />
                </SliderTrack>
                <SliderThumb aria-label="Disabled slider" />
              </SliderRoot>
              <p class="text-sm text-muted-foreground">Current value: 60</p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
