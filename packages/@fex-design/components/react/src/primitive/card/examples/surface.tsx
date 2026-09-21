import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@fex-design/react/primitive/card'

export function SurfaceExample() {
  return (
    <Card
      className="w-full max-w-2xl"
      style={
        {
          '--card-border': '2px solid #7c3aed',
          '--card-header-background': '#7c3aed',
          '--card-header-divider': 'none',
          '--card-content-background': '#f5f3ff',
          '--card-footer-background': '#facc15',
          '--card-footer-divider': '2px solid #7c3aed',
        } as React.CSSProperties
      }
    >
      <CardHeader>
        <CardTitle className="text-lg font-bold text-white">三个独立 Surface</CardTitle>
      </CardHeader>
      <CardContent className="text-violet-950">
        Content 使用浅紫背景，和 Header 的高饱和紫色形成清晰边界。
      </CardContent>
      <CardFooter className="font-semibold text-amber-950">
        Footer 使用黄色背景和独立 divider。
      </CardFooter>
    </Card>
  )
}
