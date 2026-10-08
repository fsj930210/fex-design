import { CheckIcon } from '@fex-design/react/icons/check'
import type { normalizeProgressValue } from '@fex-design/core/progress/progress'
import type { ProgressProps } from './types'

interface ProgressInfoProps {
  normalized: ReturnType<typeof normalizeProgressValue>
  status: ProgressProps['status']
  variant: ProgressProps['variant']
  format: ProgressProps['format']
}

export function ProgressInfo({ normalized, status, variant, format }: ProgressInfoProps) {
  const isSuccess = status === 'success'
  if (format) {
    return format(
      normalized.percentage !== null ? Math.round(normalized.percentage * 100) : null,
      normalized.value,
    )
  }
  if (isSuccess && variant !== 'line') {
    return <CheckIcon className="size-6 text-success" />
  }
  if (isSuccess && normalized.percentage !== null && normalized.percentage >= 1) {
    return (
      <span className="inline-flex size-4 items-center justify-center rounded-full bg-success text-[10px] text-white">
        <CheckIcon className="size-3" />
      </span>
    )
  }
  return normalized.percentage !== null ? `${Math.round(normalized.percentage * 100)}%` : ''
}
