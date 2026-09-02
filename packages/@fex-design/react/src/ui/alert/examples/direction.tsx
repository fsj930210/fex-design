import { Alert } from '@fex-design/react/ui/alert'

export default function Direction() {
  const items = [
    { dir: 'ltr', title: '配置需要确认', action: '查看' },
    { dir: 'rtl', title: 'يجب تأكيد الإعداد', action: 'عرض' },
  ] as const
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <section key={item.dir} dir={item.dir} className="grid gap-3 rounded-lg border p-4">
          <strong>{item.dir.toUpperCase()}</strong>
          <Alert type="warning" showIcon closable title={item.title} action={<button className="underline">{item.action}</button>} />
        </section>
      ))}
    </div>
  )
}
