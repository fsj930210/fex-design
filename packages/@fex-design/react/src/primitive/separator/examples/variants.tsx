import { Separator } from '@fex-design/react/primitive/separator'
export const VariantsDemo = () => (
  <div className="grid w-full max-w-xl gap-3">
      <div className="grid gap-1.5">
        <span className="text-sm">Solid</span>
        <Separator />
      </div>
      <div className="grid gap-1.5">
        <span className="text-sm">Dashed</span>
        <Separator className="h-0 border-t border-dashed bg-transparent" />
      </div>
      <div className="grid gap-1.5">
        <span className="text-sm">Dotted</span>
        <Separator className="h-0 border-t border-dotted bg-transparent" />
      </div>
  </div>
)
