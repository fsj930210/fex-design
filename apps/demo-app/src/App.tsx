import { useState } from "react"
import { Button, ButtonGroup } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Popover } from "@/components/ui/popover"
import { Tooltip } from "@/components/ui/tooltip"

export default function App() {
  const [clickCount, setClickCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "buttons" | "alerts">("overview")

  const handleSimulateAsync = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setClickCount((c) => c + 1)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-neutral-50/50 text-foreground dark:bg-neutral-950 p-6 md:p-12 font-sans selection:bg-primary/20">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight">Fex Source Delivery Showcase</h1>
              <Badge count="v1.0" color="primary" />
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Zero-npm delivery &middot; Inlined Tailwind classes &middot; Pure self-contained components
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === "overview" ? "solid" : "outlined"}
              color="primary"
              size="sm"
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </Button>
            <Button
              variant={activeTab === "buttons" ? "solid" : "outlined"}
              color="primary"
              size="sm"
              onClick={() => setActiveTab("buttons")}
            >
              Buttons
            </Button>
            <Button
              variant={activeTab === "alerts" ? "solid" : "outlined"}
              color="primary"
              size="sm"
              onClick={() => setActiveTab("alerts")}
            >
              Alerts
            </Button>
          </div>
        </header>

        {/* Global Notice Alert */}
        <Alert
          type="info"
          title="Source Code Delivered Directly"
          description="All components displayed below reside directly inside src/components/ with inlined Tailwind classes and no external styles or core package dependencies."
        />

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card
            title="Total Components"
            description="Installed via Fex CLI"
            extra={<span className="text-xs font-semibold text-primary">Active</span>}
          >
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-bold tracking-tight">5</span>
              <span className="text-xs text-neutral-500">Button, Card, Badge, Alert, Separator</span>
            </div>
          </Card>

          <Card
            title="Styles Architecture"
            description="Class Delivery Pattern"
            extra={<Badge dot color="success" />}
          >
            <div className="mt-2">
              <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">100% Inlined</span>
              <p className="text-xs text-neutral-500 mt-1">Direct JSX classNames with native IDE IntelliSense</p>
            </div>
          </Card>

          <Card
            title="Core Dependency"
            description="Package Isolation"
            extra={<Badge count="0 Core" color="info" />}
          >
            <div className="mt-2">
              <span className="text-lg font-semibold text-sky-600 dark:text-sky-400">Zero Shared Core</span>
              <p className="text-xs text-neutral-500 mt-1">Component types &amp; helpers co-located inside modules</p>
            </div>
          </Card>
        </div>

        {/* Button & Interactive Showcase */}
        {(activeTab === "overview" || activeTab === "buttons") && (
          <Card
            title="Button Variants & States"
            description="Generated with private CVA variants and cascaded Primitive components."
            extra={
              <Badge count={clickCount} overflowCount={99}>
                <Button size="sm" variant="outlined">Notifications</Button>
              </Badge>
            }
          >
            <div className="space-y-6 pt-2">
              {/* Variants */}
              <div>
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Variants</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="solid" color="primary">Solid Primary</Button>
                  <Button variant="outlined" color="primary">Outlined</Button>
                  <Button variant="dashed" color="primary">Dashed</Button>
                  <Button variant="filled" color="primary">Filled</Button>
                  <Button variant="text" color="primary">Text</Button>
                  <Button variant="link" color="primary">Link Button</Button>
                </div>
              </div>

              <Separator />

              {/* Semantic Colors */}
              <div>
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Colors</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="solid" color="primary">Primary</Button>
                  <Button variant="solid" color="success">Success</Button>
                  <Button variant="solid" color="warning">Warning</Button>
                  <Button variant="solid" color="danger">Danger</Button>
                  <Button variant="solid" color="info">Info</Button>
                </div>
              </div>

              <Separator />

              {/* Interactive Loading and Groups */}
              <div>
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Interactive States &amp; Groups</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    variant="solid"
                    color="primary"
                    loading={loading}
                    onClick={handleSimulateAsync}
                  >
                    {loading ? "Processing..." : "Trigger Action (Clicks: " + clickCount + ")"}
                  </Button>

                  <ButtonGroup>
                    <Button variant="outlined">Years</Button>
                    <Button variant="outlined">Months</Button>
                    <Button variant="outlined">Days</Button>
                  </ButtonGroup>

                  <Button variant="outlined" disabled>Disabled State</Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Popover & Tooltip Interactive Overlay Showcase */}
        {activeTab === "overview" && (
          <Card title="Floating Overlays (Popover & Tooltip)" extra={<Badge color="success" count="Zero Core / Hooks Cascaded" />}>
            <div className="flex flex-wrap items-center gap-4">
              <Popover
                title="Popover Configuration"
                content={
                  <div className="space-y-2 text-xs text-zinc-600 w-56">
                    <p>This Popover is powered by local <code>utils.ts</code>, <code>@/hooks/*</code>, and <code>@/lib/utils/shared/*</code>.</p>
                    <p className="font-medium text-emerald-600">Zero @fex-design package imports!</p>
                  </div>
                }
              >
                <Button color="primary" variant="solid">Click to Open Popover</Button>
              </Popover>

              <Tooltip title="Floating UI positioning with zero external @fex-design packages">
                <Button variant="outlined">Hover for Tooltip</Button>
              </Tooltip>
            </div>
          </Card>
        )}

        {/* Alert Showcase */}
        {(activeTab === "overview" || activeTab === "alerts") && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold">Alert Feedback Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Alert
                type="success"
                title="Operation Completed"
                description="The component was installed and all styles were properly inlined without external styles packages."
              />
              <Alert
                type="warning"
                title="Configuration Notice"
                description="Ensure your tailwind.css configuration matches your design tokens."
              />
              <Alert
                type="error"
                title="Validation Error"
                description="Sample destructive alert component demonstrating color variations."
              />
              <Alert
                type="info"
                title="Documentation Tip"
                description="Click any component file in src/components to inspect the fully autonomous source code."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
