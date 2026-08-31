import { Link } from 'react-router'
import { BasicDemo } from './basic-demo'
import { ControlledDemo } from './controlled-demo'
import { CustomDemo } from './custom-demo'
import { DisabledDemo } from './disabled-demo'
import { DynamicDemo } from './dynamic-demo'
import { NavigationDemo } from './navigation-demo'
import { ResponsiveDemo } from './responsive-demo'
export function StepsPage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-4">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">Steps</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Value-based workflow stages with navigation and responsive layout.
            </p>
          </div>
        </header>
        <div className="space-y-4">
          <BasicDemo />
          <NavigationDemo />
          <DisabledDemo />
          <ControlledDemo />
          <DynamicDemo />
          <CustomDemo />
          <ResponsiveDemo />
        </div>
      </div>
    </main>
  )
}
