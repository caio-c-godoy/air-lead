import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // só aplica se estiver na raiz "/"
  if (pathname === '/') {
    // verifica se já existe cookie de idioma
    const savedLang = request.cookies.get('preferred_lang')?.value

    if (savedLang) {
      return NextResponse.redirect(new URL(`/${savedLang}`, request.url))
    }

    // senão, usa o idioma do navegador
    const browserLang =
      request.headers.get('accept-language')?.split(',')[0].toLowerCase() || 'en'

    let target = '/en'
    if (browserLang.startsWith('pt')) target = '/pt'
    if (browserLang.startsWith('es')) target = '/es'

    // salva cookie de idioma escolhido
    const res = NextResponse.redirect(new URL(target, request.url))
    res.cookies.set('preferred_lang', target.replace('/', ''), {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 30, // 30 dias
    })
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}
