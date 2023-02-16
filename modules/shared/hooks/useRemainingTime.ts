import { debounce } from 'lodash'
import { Duration } from 'luxon'
import { useEffect, useMemo, useState } from 'react'

export interface Expiration {
  minutes: number
  seconds: number
}

export interface UseRemainingTime {
  label: string
  isExpired: boolean
}

export function useRemainingTime(
  { minutes = 0, seconds = 0 }: Partial<Expiration>,
  onExpired?: () => void
): UseRemainingTime {
  const [duration, setDuration] = useState(
    Duration.fromObject({ minutes, seconds })
  )

  const isExpired = useMemo(() => {
    const hasTime = duration.toMillis() > 0

    return !hasTime
  }, [duration])

  const label = useMemo(() => {
    return [
      [Math.ceil(duration.minutes), 'm'],
      [Math.ceil(duration.seconds), 's']
    ]
      .map(([time, text]) => `${String(time).padStart(2, '0')}${text}`)
      .join(' ')
  }, [duration.minutes, duration.seconds])

  const handleUpdateDuration = debounce(() => {
    const updatedDuration = Duration.fromDurationLike(duration)
      .minus(1000)
      .shiftTo('minutes', 'seconds')
      .toObject()

    const hasTime = Object.keys(updatedDuration).some(
      (key) => !!duration[key as keyof Duration]
    )

    if (!hasTime) {
      if (onExpired) {
        onExpired()
      }

      return
    }

    const newDuration = Duration.fromDurationLike({
      minutes: Math.ceil(updatedDuration.minutes || 0),
      seconds: Math.ceil(updatedDuration.seconds || 0)
    })

    setDuration(newDuration)
  })

  useEffect(() => {
    setDuration(Duration.fromObject({ minutes, seconds }))
  }, [minutes, seconds])

  useEffect(() => {
    const interval = setInterval(() => {
      handleUpdateDuration()
    }, 1000)

    return () => clearInterval(interval)
  }, [handleUpdateDuration])

  return { label, isExpired }
}

export default useRemainingTime
