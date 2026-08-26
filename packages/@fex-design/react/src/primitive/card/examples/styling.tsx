import {
  Card,
  CardContent,
  CardExtra,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from '../card'

export function StylingExample() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="bg-violet-600">
        <CardTitle className="text-lg font-bold text-white">季度增长</CardTitle>
        <CardDescription className="text-violet-100">
          Header、Content、Footer 使用明显不同的颜色。
        </CardDescription>
        <CardExtra>
          <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-semibold text-white">
            +28.4%
          </span>
        </CardExtra>
      </CardHeader>
      <CardContent className="bg-violet-50 p-8 text-violet-950">
        Header、Content、Footer 使用明显不同的颜色，便于观察每个语义区域的覆盖边界。
      </CardContent>
      <CardFooter className="justify-end bg-amber-300">
        <button className="rounded-md bg-amber-950 px-3 py-1.5 font-semibold text-amber-50">
          查看报告
        </button>
      </CardFooter>
    </Card>
  )
}
