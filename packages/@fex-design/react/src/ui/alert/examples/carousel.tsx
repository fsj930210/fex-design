import { Alert } from '@fex-design/react/ui/alert'

export default function Carousel() {
  return (
    <>
      <style>{`@keyframes alert-marquee{to{transform:translateX(-50%)}}.alert-marquee-track{animation:alert-marquee 18s linear infinite}.alert-marquee:hover .alert-marquee-track,.alert-marquee:focus-within .alert-marquee-track{animation-play-state:paused}@media(prefers-reduced-motion:reduce){.alert-marquee-track{animation:none}.alert-marquee-copy{display:none}}[dir=rtl] .alert-marquee-track{animation-direction:reverse}`}</style>
      <Alert type="warning" showIcon className="overflow-hidden">
        <div className="alert-marquee overflow-hidden">
          <div className="alert-marquee-track flex w-max">
            <span className="pe-12">系统将在今晚 22:00 至 23:00 进行维护，<a href="#notice">查看公告详情</a></span>
            <span aria-hidden="true" className="alert-marquee-copy pe-12">系统将在今晚 22:00 至 23:00 进行维护，查看公告详情</span>
          </div>
        </div>
      </Alert>
    </>
  )
}
