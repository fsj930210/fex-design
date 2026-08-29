export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error'

export interface ImageLoaderOptions {
  src: string
  crossOrigin?: string
  referrerPolicy?: ReferrerPolicy
  signal?: AbortSignal
}

export type ImageLoader = (options: ImageLoaderOptions) => Promise<void>
