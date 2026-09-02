import { Empty } from '@fex-design/react/ui/empty'

export function DirectionExample() {
  return <div className="grid w-full gap-6 sm:grid-cols-2"><section className="grid gap-3"><strong>LTR · 中文示例</strong><Empty dir="ltr" title="暂无项目" description="创建项目后，项目会显示在这里。"><div className="flex gap-2"><button className="rounded-md bg-primary px-3 py-2 text-primary-foreground">创建项目</button><button className="rounded-md border border-border px-3 py-2">导入项目</button></div></Empty></section><section className="grid gap-3"><strong>RTL · مثال عربي</strong><Empty dir="rtl" title="لا توجد مشاريع" description="ستظهر المشاريع هنا بعد إنشائها."><div className="flex gap-2"><button className="rounded-md bg-primary px-3 py-2 text-primary-foreground">إنشاء مشروع</button><button className="rounded-md border border-border px-3 py-2">استيراد مشروع</button></div></Empty></section></div>
}
