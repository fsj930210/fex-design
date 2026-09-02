import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Alert } from '../alert'
@Component({ selector: 'alert-carousel-example', standalone: true, imports: [Alert], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './carousel.html', styles: [`@keyframes alert-loop{to{transform:translateX(-50%)}}.track{animation:alert-loop 18s linear infinite}.marquee:hover .track,.marquee:focus-within .track{animation-play-state:paused}@media(prefers-reduced-motion:reduce){.track{animation:none}.copy{display:none}}:host-context([dir=rtl]) .track{animation-direction:reverse}`] })
export class AlertCarouselExample {}
