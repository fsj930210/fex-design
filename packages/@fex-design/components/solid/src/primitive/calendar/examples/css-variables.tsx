import { CalendarRoot } from '@fex-design/solid/primitive/calendar'
import { ExampleContent } from './_parts/content'
import { getCalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import type { CSSProperties } from 'react'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
export function CssVariablesExample() {
  return (
    <div
      style={
        {
          '--calendar-hover-background': 'var(--success)',
          '--calendar-selected-background': 'var(--primary)',
          '--calendar-selected-foreground': 'var(--primary-foreground)',
          '--calendar-today-color': 'var(--danger)',
        } as CSSProperties
      }
    >
      <CalendarRoot
        {...getCalendarUIOptions({ defaultViewDate: calendarDemoDate })}
        class={calendarUIRootClassName}
        data-fullscreen={true}
      >
        <ExampleContent options={{ defaultViewDate: calendarDemoDate }} />
      </CalendarRoot>
    </div>
  )
}
