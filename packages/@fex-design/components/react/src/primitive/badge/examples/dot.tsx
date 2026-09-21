import { BadgeDot } from '@fex-design/react/primitive/badge'

export function Dot() {
  return (
    <div className="flex items-center gap-6">
      <span className="relative inline-flex">
        📣
        <BadgeDot
          color="danger"
          className="absolute end-0 top-0 -translate-y-1/2 translate-x-1/2"
        />
      </span>
      <a href="#badge-dot" className="relative inline-flex text-primary">
        Link something
        <BadgeDot
          color="danger"
          className="absolute end-0 top-0 -translate-y-1/2 translate-x-1/2"
        />
      </a>
    </div>
  )
}
