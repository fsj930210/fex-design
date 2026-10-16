import { DatePicker } from '@fex-design/solid/ui/date-picker'

export function DatePickerPanelExample() {
  
  
  return <div class="flex flex-wrap items-start gap-4">
    <DatePicker  panelRender={panel => <div><p class="p-2 text-sm">自定义面板容器</p>{panel}</div>} />
  </div>
}
