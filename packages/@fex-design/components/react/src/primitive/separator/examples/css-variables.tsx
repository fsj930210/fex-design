import { Separator } from '@fex-design/react/primitive/separator'
export const BasicDemo = () => (
  <div className="grid w-full max-w-xl gap-2">
    <div>
      <div className="font-medium">Fex Design</div>
      <div className="text-sm text-muted-foreground">
        Composable components for five frameworks.
      </div>
    </div>
    <Separator className="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]" />
    <div className="text-sm">React · Vue · Solid · Svelte · Angular</div>
  </div>
)
