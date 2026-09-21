import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@fex-design/react/primitive/card'
export function CssVariablesExample() {
  return (
    <Card className="w-full max-w-2xl [--card-border:2px_solid_#db2777] [--card-radius:1.5rem] [--card-shadow:0_20px_45px_rgb(190_24_93_/_0.2)] [--card-header-background:#fce7f3] [--card-content-background:#fff1f2] [--card-footer-background:#fbcfe8] [--card-header-padding:1.5rem] [--card-content-padding:2rem] [--card-footer-padding:1.25rem_1.5rem]">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-pink-950">实例级主题</CardTitle>
        <CardDescription>只影响这一张 Card</CardDescription>
      </CardHeader>
      <CardContent>所有值都直接写在当前 Card 实例上。</CardContent>
      <CardFooter>变量可以同时替换圆角、阴影和三个区域。</CardFooter>
    </Card>
  )
}
