import { useState, useEffect, RefObject } from 'react'

export function useInView(ref: RefObject<Element>) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return isInView
}
