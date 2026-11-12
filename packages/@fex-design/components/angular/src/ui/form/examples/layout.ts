import { Select } from '@fex-design/angular/ui/select'
import { Checkbox } from '@fex-design/angular/ui/checkbox'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SearchLayout, type LayoutOptions } from './_search-layout'
@Component({
  selector: 'section[formLayoutExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SearchLayout, Select, Checkbox],
  template: `
    <section class="mx-auto grid w-full max-w-2xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">表单布局与标签对齐</h3>
        <p class="text-sm text-muted-foreground">
          使用长短不同的标签比较布局。调整配置后直接提交，观察标签、控件、说明、错误和按钮的对齐。
        </p>
      </header>
      <div class="grid gap-3 rounded-md bg-muted-background p-3 text-sm sm:grid-cols-3">
        <div class="grid gap-1">
          <span>标签对齐</span>
          <div
            select
            [value]="options().labelAlign"
            [options]="alignOptions"
            [inputProps]="{ 'aria-label': '标签对齐' }"
            (onChange)="setAlign($any($event.value))"
          ></div>
        </div>
        <div class="grid gap-1">
          <span>标签列宽</span>
          <div
            select
            [value]="options().labelWidth"
            [options]="widthOptions"
            [inputProps]="{ 'aria-label': '标签列宽' }"
            (onChange)="setWidth($any($event.value))"
          ></div>
        </div>
        <div class="grid gap-1">
          <span>标签间距</span>
          <div
            select
            [value]="options().labelGap"
            [options]="gapOptions"
            [inputProps]="{ 'aria-label': '标签间距' }"
            (onChange)="setGap($any($event.value))"
          ></div>
        </div>
        <div
          checkbox
          class="sm:col-span-3"
          [checked]="options().labelWrap"
          (onChange)="setWrap($any($event).target.checked)"
        >
          标签换行
        </div>
      </div>
      <section searchLayout layout="vertical" [options]="options()"></section>
      <section searchLayout layout="horizontal" [options]="options()"></section>
      <section searchLayout layout="inline" [options]="options()"></section>
    </section>
  `,
})
export class LayoutExample {
  readonly alignOptions = [
    { value: 'start', label: '起始侧对齐' },
    { value: 'end', label: '末尾侧对齐' },
  ]
  readonly widthOptions = [
    { value: '6rem', label: '6rem' },
    { value: '8rem', label: '8rem' },
    { value: '10rem', label: '10rem' },
  ]
  readonly gapOptions = [
    { value: '0.375rem', label: '紧凑' },
    { value: '0.5rem', label: '默认' },
    { value: '0.75rem', label: '宽松' },
  ]
  readonly options = signal<LayoutOptions>({
    labelAlign: 'end',
    labelWidth: '8rem',
    labelGap: '0.5rem',
    labelWrap: true,
  })
  setAlign(labelAlign: LayoutOptions['labelAlign']) {
    this.options.update((value) => ({ ...value, labelAlign }))
  }
  setWidth(labelWidth: string) {
    this.options.update((value) => ({ ...value, labelWidth }))
  }
  setGap(labelGap: string) {
    this.options.update((value) => ({ ...value, labelGap }))
  }
  setWrap(labelWrap: boolean) {
    this.options.update((value) => ({ ...value, labelWrap }))
  }
}
