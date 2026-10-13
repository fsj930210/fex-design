import { usageSnippetsPart1, type UsageItem, type ComponentUsage } from "./usage-snippets-part1"
import { usageSnippetsPart2 } from "./usage-snippets-part2"

export type { UsageItem, ComponentUsage }

export const usageSnippets: Record<string, ComponentUsage> = {
  ...usageSnippetsPart1,
  ...usageSnippetsPart2,
  calendar: {
    ui: { import: "import { Calendar } from '@/components/ui/calendar'\nimport { createCalendarDate } from '@fex-design/core/calendar'", code: '<Calendar defaultViewDate={createCalendarDate(2026, 10, 8)} />' },
    primitive: {
      import: "import { CalendarRoot, CalendarHeader, CalendarNavigationButton, CalendarWeekHeader, CalendarGrid, CalendarFooter } from '@/components/primitive/calendar'\nimport { createCalendarDate } from '@fex-design/core/calendar'",
      code: `<CalendarRoot defaultViewDate={createCalendarDate(2026, 10, 8)}>
  <CalendarHeader>
    <CalendarNavigationButton action="previous-panel">上一页</CalendarNavigationButton>
    <CalendarNavigationButton action="next-panel">下一页</CalendarNavigationButton>
  </CalendarHeader>
  <CalendarWeekHeader />
  <CalendarGrid />
  <CalendarFooter>自定义底部</CalendarFooter>
</CalendarRoot>`,
    },
  },
}
