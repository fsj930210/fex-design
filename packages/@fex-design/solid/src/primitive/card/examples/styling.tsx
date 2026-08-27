import {
  Card,
  CardContent,
  CardDescription,
  CardExtra,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@fex-design/solid/primitive/card'

export function StylingExample() {
  return (
    <Card class="w-full max-w-2xl">
      <CardHeader class="bg-violet-600">
        <CardTitle class="text-lg font-bold text-white">季度增长</CardTitle>
        <CardDescription class="text-violet-100">
          Header、Content、Footer 使用明显不同的颜色。
        </CardDescription>
        <CardExtra>
          <span class="rounded-full bg-white/20 px-2 py-1 text-xs font-semibold text-white">
            +28.4%
          </span>
        </CardExtra>
      </CardHeader>
      <CardContent class="bg-violet-50 p-8 text-violet-950">
        Header、Content、Footer 使用明显不同的颜色，便于观察每个语义区域的覆盖边界。
      </CardContent>
      <CardFooter class="justify-end bg-amber-300">
        <button class="rounded-md bg-amber-950 px-3 py-1.5 font-semibold text-amber-50">
          查看报告
        </button>
      </CardFooter>
    </Card>
  )
}
