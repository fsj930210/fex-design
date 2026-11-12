import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '@fex-design/angular/ui/separator'
@Component({
  selector: 'section[separatorBasicExample]',
  standalone: true,
  imports: [Separator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="grid w-full max-w-xl gap-2">
    <p class="font-medium">内容分隔</p>
    <div separator></div>
    <p class="text-sm text-muted-foreground">使用分隔线区分相邻内容区域。</p>
  </div>`,
})
export class BasicExample {}
