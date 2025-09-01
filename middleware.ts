
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SUPPORTED = ['en','pt','es'] as const
type Locale = typeof SUPPORTED[number]

function detect(req: NextRequest): Locale {
  const header = req.headers.get('accept-language') || ''
  const order = header.split(',').map(s => s.split(';')[0].trim())
  for (const lang of order) {
    const base = lang.toLowerCase().slice(0,2)
    if (SUPPORTED.includes(base as Locale)) return base as Locale
  }
  return 'en'
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // redirect root or paths without locale prefix
  const first = pathname.split('/')[1]
  if (!SUPPORTED.includes(first as Locale)) {
    const locale = detect(req)
    const url = req.nextUrl.clone()
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = { matcher: ['/', '/((?!_next|.*\..*).*)'] }
