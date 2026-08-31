import { Card } from '@fex-design/react/ui/card'
import { Link } from 'react-router'
import { HorizontalNestedDemo } from './horizontal-nested-demo'
import { MenubarDemo } from './menubar-demo'
import { NavDemo } from './nav-demo'
import {
  BasicDemo,
  ControlledDemo,
  CustomItemDemo,
  MultipleDemo,
  SuffixDemo,
} from './vertical-demos'

export function MenuPage() {
  return (
    <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="space-y-2">
          <Link className="text-sm text-muted-foreground" to="/">
            Back home
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">Menu</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              One primitive for navigation, command bars and nested menus.
            </p>
          </div>
        </header>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card
            title="Basic"
            description="Items, nested children, group, divider and disabled state."
          >
            <BasicDemo />
          </Card>
          <Card
            title="Controlled"
            description="Expanded and selected state are owned by the caller."
          >
            <ControlledDemo />
          </Card>
          <Card
            title="Multiple Selection"
            description="The caller composes multiple selected items with the same primitive."
          >
            <MultipleDemo />
          </Card>
          <Card title="Suffix" description="Items accept arbitrary right-side content.">
            <SuffixDemo />
          </Card>
          <Card title="Custom Item" description="Render props bind menu behavior to custom DOM.">
            <CustomItemDemo />
          </Card>
          <Card
            title="Horizontal nested menu"
            description="Horizontal root navigation with floating submenus at multiple levels."
          >
            <HorizontalNestedDemo />
          </Card>
          <Card
            title="Menubar"
            description="Command-bar semantics and styling without a separate component family."
          >
            <MenubarDemo />
          </Card>
          <Card
            title="Navigation"
            description="Custom link triggers with horizontal keyboard navigation."
          >
            <NavDemo />
          </Card>
        </div>
      </div>
    </main>
  )
}
