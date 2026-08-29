export interface LoadImageOptions {
  src: string
  crossOrigin?: string
  referrerPolicy?: ReferrerPolicy
  signal?: AbortSignal
}

export function loadImage({ src, crossOrigin, referrerPolicy, signal }: LoadImageOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('The image load was aborted.', 'AbortError'))
      return
    }

    const image = new Image()
    let settled = false

    const cleanup = () => {
      image.onload = null
      image.onerror = null
      signal?.removeEventListener('abort', handleAbort)
    }
    const settle = (callback: () => void) => {
      if (settled) return
      settled = true
      cleanup()
      callback()
    }
    const handleAbort = () => settle(() => reject(new DOMException('The image load was aborted.', 'AbortError')))

    if (crossOrigin !== undefined) image.crossOrigin = crossOrigin
    if (referrerPolicy !== undefined) image.referrerPolicy = referrerPolicy
    signal?.addEventListener('abort', handleAbort, { once: true })
    image.onload = () => settle(resolve)
    image.onerror = () => settle(() => reject(new Error(`Unable to load image: ${src}`)))
    image.src = src

    if (image.complete) {
      if (image.naturalWidth > 0) settle(resolve)
      else settle(() => reject(new Error(`Unable to load image: ${src}`)))
    }
  })
}
