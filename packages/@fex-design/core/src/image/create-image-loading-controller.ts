import type { ImageLoader, ImageLoaderOptions, ImageLoadingStatus } from './types'

export interface ImageLoadingController {
  getStatus(): ImageLoadingStatus
  load(options: ImageLoaderOptions): void
  reset(): void
  subscribe(listener: () => void): () => void
}

export function createImageLoadingController(loader: ImageLoader): ImageLoadingController {
  let status: ImageLoadingStatus = 'idle'
  let requestId = 0
  let abortController: AbortController | undefined
  const listeners = new Set<() => void>()

  const notify = () => listeners.forEach((listener) => listener())
  const setStatus = (nextStatus: ImageLoadingStatus) => {
    if (status === nextStatus) return
    status = nextStatus
    notify()
  }

  return {
    getStatus: () => status,
    load(options) {
      abortController?.abort()
      abortController = new AbortController()
      const currentRequest = ++requestId
      setStatus('loading')
      loader({ ...options, signal: abortController.signal }).then(
        () => {
          if (currentRequest === requestId) setStatus('loaded')
        },
        (error: unknown) => {
          if (currentRequest === requestId && !(error instanceof DOMException && error.name === 'AbortError')) {
            setStatus('error')
          }
        },
      )
    },
    reset() {
      abortController?.abort()
      abortController = undefined
      requestId += 1
      setStatus('idle')
    },
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}
