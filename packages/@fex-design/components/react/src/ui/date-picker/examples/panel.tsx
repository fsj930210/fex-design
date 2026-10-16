import { DatePicker } from '@fex-design/react/ui/date-picker'

export function DatePickerPanelExample() {
  
  
  return <div className="flex flex-wrap items-start gap-4">
    <DatePicker  panelRender={panel => <div><p className="p-2 text-sm">自定义面板容器</p>{panel}</div>} />
  </div>
}
