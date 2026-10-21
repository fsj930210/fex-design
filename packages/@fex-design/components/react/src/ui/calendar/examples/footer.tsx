import { Calendar } from '@fex-design/react/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
export function FooterExample() {
  return (
    <Calendar
      defaultViewDate={calendarDemoDate}
      footerRender={({ controller }) => (
        <button type="button" onClick={() => controller.navigate('today')}>
          回到今天
        </button>
      )}
    />
  )
}
