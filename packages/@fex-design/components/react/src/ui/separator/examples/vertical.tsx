import { Separator } from '@fex-design/react/ui/separator'
export const VerticalDemo = () => (
  <div className="flex w-full justify-center h-5 items-center gap-2">
    <span>Blog</span>
    <Separator orientation="vertical" />
    <span>Docs</span>
    <Separator orientation="vertical" />
    <span>Source</span>
  </div>
)
