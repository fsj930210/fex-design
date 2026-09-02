import { Alert, AlertIcon } from '@fex-design/solid/primitive/alert'
import { CircleWarningIcon } from '@fex-design/solid/icon/circle-warning'

export default function Carousel() {
  return <><style>{`@keyframes solid-alert-loop{to{transform:translateX(-50%)}}.solid-alert-track{animation:solid-alert-loop 18s linear infinite}.solid-alert-marquee:hover .solid-alert-track,.solid-alert-marquee:focus-within .solid-alert-track{animation-play-state:paused}@media(prefers-reduced-motion:reduce){.solid-alert-track{animation:none}.solid-alert-copy{display:none}}[dir=rtl] .solid-alert-track{animation-direction:reverse}`}</style><Alert type="warning" class="overflow-hidden"><AlertIcon><CircleWarningIcon/></AlertIcon><div class="solid-alert-marquee overflow-hidden"><div class="solid-alert-track flex w-max"><span class="pe-12">系统将在今晚 22:00 至 23:00 进行维护，<a href="#notice">查看公告详情</a></span><span aria-hidden="true" class="solid-alert-copy pe-12">系统将在今晚 22:00 至 23:00 进行维护，查看公告详情</span></div></div></Alert></>
}
