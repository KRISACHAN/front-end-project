import { useState, useEffect } from 'react'

type FontLoadingState = {
  loading: boolean
  error: Error | null
}

export function useFontLoading(fontUrl: string): FontLoadingState {
  const [state, setState] = useState<FontLoadingState>({
    loading: true,
    error: null
  })

  useEffect(() => {
    setState({ loading: true, error: null })

    const link = document.createElement('link')
    link.href = fontUrl
    link.rel = 'stylesheet'

    const handleLoad = () => {
      setState({ loading: false, error: null })
    }

    const handleError = (error: ErrorEvent) => {
      setState({ loading: false, error: error.error })
    }

    link.addEventListener('load', handleLoad)
    link.addEventListener('error', handleError as EventListener)

    document.head.appendChild(link)

    return () => {
      link.removeEventListener('load', handleLoad)
      link.removeEventListener('error', handleError as EventListener)
      document.head.removeChild(link)
    }
  }, [fontUrl])

  return state
}
