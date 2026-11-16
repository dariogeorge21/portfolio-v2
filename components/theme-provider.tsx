'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

// Suppress React 19 / Next.js 16 false-positive warning for next-themes script tag in development
if (process.env.NODE_ENV === 'development') {
  const origError = console.error
  console.error = (...args: unknown[]) => {
    const str = args
      .map((a) => (typeof a === 'string' ? a : a instanceof Error ? a.message : ''))
      .join(' ')
    if (str.includes('Encountered a script tag')) {
      return
    }
    origError.apply(console, args)
  }
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
