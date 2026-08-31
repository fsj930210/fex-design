import { Link } from 'react-router'
import { BasicTourDemo } from './basic-demo'
import { ControlledTourDemo } from './controlled-demo'
import { CustomActionsTourDemo } from './actions-demo'
import { CustomGapTourDemo } from './gap-demo'
import { CustomIndicatorTourDemo } from './indicator-demo'
import { CustomMaskTourDemo } from './mask-demo'
import { NonModalTourDemo } from './non-modal-demo'
import { PlacementTourDemo } from './placement-demo'

export function TourPage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-1.5">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Tour</h1>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
              Composable guided tours with registered targets, floating positioning and fully custom
              content.
            </p>
          </div>
        </header>
        <div className="space-y-4">
          <BasicTourDemo />
          <ControlledTourDemo />
          <CustomActionsTourDemo />
          <CustomGapTourDemo />
          <CustomIndicatorTourDemo />
          <CustomMaskTourDemo />
          <NonModalTourDemo />
          <PlacementTourDemo />
        </div>
      </div>
    </main>
  )
}
