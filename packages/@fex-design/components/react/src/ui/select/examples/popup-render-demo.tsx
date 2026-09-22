import { Select } from '@fex-design/react/ui/select'

const options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }]

export default function Example() {
  return <Select className="w-72" options={options} popupRender={(menu) => <div>{menu}<div className="border-t border-border px-3 py-2 text-xs text-muted-foreground">选择常用框架</div></div>} />
}
