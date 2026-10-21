<script lang="ts">
  import { CalendarRoot } from "@fex-design/svelte/primitive/calendar";
  import {
    getCalendarUIOptions,
    type CalendarUIOptions,
  } from "@fex-design/core/calendar";
  import { calendarUIRootClassName } from "@fex-design/components-styles/calendar";
  import ExampleContent from "./_parts/content.svelte";
  import { calendarDemoDate } from "@fex-design/docs-shared/calendar-demo-data";
  const locale = {
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    year: "Year",
    month: "Month",
    datePanel: "Month",
    monthPanel: "Year",
    previous: "Previous",
    next: "Next",
    today: "Today",
    week: "Week",
    weekStartsOn: 0,
    firstWeekContainsDate: 1,
  } as const;
  const rtlLocale = {
    ...locale,
    weekdays: [
      "الأحد",
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ],
    months: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    year: "السنة",
    month: "الشهر",
    datePanel: "الشهر",
    monthPanel: "السنة",
    previous: "السابق",
    next: "التالي",
    today: "اليوم",
    week: "الأسبوع",
  };
  const ltrOptions: CalendarUIOptions = {
    defaultViewDate: calendarDemoDate,
    locale,
  };
  const rtlOptions: CalendarUIOptions = {
    defaultViewDate: calendarDemoDate,
    locale: rtlLocale,
  };
</script>

<div class="grid gap-6">
  <section dir="ltr" class="min-w-0 rounded-lg border p-3">
    <strong class="mb-3 block">LTR · English</strong><CalendarRoot
      {...getCalendarUIOptions(ltrOptions)}
      class={calendarUIRootClassName}
      data-fullscreen={true}
      ><ExampleContent options={ltrOptions} /></CalendarRoot
    >
  </section>
  <section dir="rtl" class="min-w-0 rounded-lg border p-3">
    <strong class="mb-3 block">RTL · العربية</strong><CalendarRoot
      {...getCalendarUIOptions(rtlOptions)}
      class={calendarUIRootClassName}
      data-fullscreen={true}
      ><ExampleContent options={rtlOptions} /></CalendarRoot
    >
  </section>
</div>
