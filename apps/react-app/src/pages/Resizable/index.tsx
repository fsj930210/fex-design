import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@fex-design/react/ui/resizable'
import { Card } from '@fex-design/react/ui/card'
import { Link } from 'react-router'

export function ResizablePage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-4">
          <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
            Back home
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Resizable</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Split panel layout component for sidebars and workspace surfaces.
            </p>
          </div>
        </header>

        <div className="space-y-4">
          <Card
            title="Horizontal"
            description="Pointer and keyboard resizing with min and max constraints."
          >
            <div className="h-72 overflow-hidden rounded-md border border-border bg-background">
              <ResizablePanelGroup direction="horizontal" defaultLayout={[28, 72]}>
                <ResizablePanel id="sidebar" minSize={18} maxSize={45} className="p-2">
                  <h2 className="text-sm font-medium">Sidebar</h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Resize from the handle.
                  </p>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel id="content" minSize={45} className="p-2">
                  <h2 className="text-sm font-medium">Content</h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Use arrow keys while the handle is focused.
                  </p>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </Card>

          <Card title="Vertical" description="Use a vertical group for stacked panels.">
            <div className="h-80 overflow-hidden rounded-md border border-border bg-background">
              <ResizablePanelGroup direction="vertical" defaultLayout={[30, 70]}>
                <ResizablePanel id="header" minSize={18} maxSize={45} className="p-2">
                  <h2 className="text-sm font-medium">Header</h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">Resize vertically.</p>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel id="main" minSize={40} className="p-2">
                  <h2 className="text-sm font-medium">Content</h2>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </Card>

          <Card
            title="Nested"
            description="Horizontal and vertical groups can be composed in one frame."
          >
            <div className="h-96 overflow-hidden rounded-md border border-border bg-background">
              <ResizablePanelGroup direction="horizontal" defaultLayout={[28, 72]}>
                <ResizablePanel id="nested-sidebar" minSize={18} className="p-2">
                  Sidebar
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel id="nested-workspace" minSize={45}>
                  <ResizablePanelGroup direction="vertical" defaultLayout={[55, 45]}>
                    <ResizablePanel id="nested-editor" minSize={35} className="p-2">
                      Editor
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel id="nested-console" minSize={25} className="p-2">
                      Console
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </Card>

          <Card title="Disabled Handle" description="A disabled handle keeps the layout fixed.">
            <div className="h-48 overflow-hidden rounded-md border border-border bg-background">
              <ResizablePanelGroup direction="horizontal" defaultLayout={[35, 65]}>
                <ResizablePanel id="locked-left" className="p-2">
                  Locked
                </ResizablePanel>
                <ResizableHandle disabled />
                <ResizablePanel id="locked-right" className="p-2">
                  Fixed layout
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
