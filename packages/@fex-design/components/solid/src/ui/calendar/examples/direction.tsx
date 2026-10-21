import { Calendar } from '@fex-design/solid/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
const locale = {
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  year: 'Year',
  month: 'Month',
  datePanel: 'Month',
  monthPanel: 'Year',
  previous: 'Previous',
  next: 'Next',
  today: 'Today',
  week: 'Week',
  weekStartsOn: 0,
  firstWeekContainsDate: 1,
} as const
export function DirectionExample() {
  return (
    <div class="grid gap-6">
      <section dir="ltr" class="min-w-0 rounded-lg border p-3">
        <strong class="mb-3 block">LTR · English</strong>
        <Calendar defaultViewDate={calendarDemoDate} locale={locale} />
      </section>
      <section dir="rtl" class="min-w-0 rounded-lg border p-3">
        <strong class="mb-3 block">RTL · العربية</strong>
        <Calendar
          defaultViewDate={calendarDemoDate}
          locale={{
            ...locale,
            weekdays: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
            months: [
              'يناير',
              'فبراير',
              'مارس',
              'أبريل',
              'مايو',
              'يونيو',
              'يوليو',
              'أغسطس',
              'سبتمبر',
              'أكتوبر',
              'نوفمبر',
              'ديسمبر',
            ],
            year: 'السنة',
            month: 'الشهر',
            datePanel: 'الشهر',
            monthPanel: 'السنة',
            previous: 'السابق',
            next: 'التالي',
            today: 'اليوم',
            week: 'الأسبوع',
          }}
        />
      </section>
    </div>
  )
}
