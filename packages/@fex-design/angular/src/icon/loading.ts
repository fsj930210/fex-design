import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'fex-loading-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-block animate-spin' },
  templateUrl: './loading.html',
})
export class LoadingIcon {}
