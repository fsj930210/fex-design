import { Switch } from '@fex-design/react/ui/switch'
import { CheckIcon } from '@fex-design/react/icon/check'
import { XIcon } from '@fex-design/react/icon/x'

export default function Example() {
  
  return <div className="grid gap-6 sm:grid-cols-2"><section className="grid gap-2">
  <span className="text-sm text-muted-foreground">rounded</span>
  <div className="flex flex-wrap items-center gap-3"><Switch shape="rounded" defaultChecked checkedContent="开启" uncheckedContent="关闭" aria-label="rounded 文字开关"></Switch><Switch shape="rounded" checkedContent="开启" uncheckedContent="关闭" aria-label="rounded 文字开关"></Switch><Switch shape="rounded" checkedContent={<CheckIcon />} uncheckedContent={<XIcon />} aria-label="rounded 图标开关"></Switch></div>
</section><section className="grid gap-2">
  <span className="text-sm text-muted-foreground">pill</span>
  <div className="flex flex-wrap items-center gap-3"><Switch shape="pill" defaultChecked checkedContent="开启" uncheckedContent="关闭" aria-label="pill 文字开关"></Switch><Switch shape="pill" checkedContent="开启" uncheckedContent="关闭" aria-label="pill 文字开关"></Switch><Switch shape="pill" checkedContent={<CheckIcon />} uncheckedContent={<XIcon />} aria-label="pill 图标开关"></Switch></div>
</section></div>
}
