import {NextResponse, NextRequest} from 'next/server';

import { getToken } from 'next-auth/jwt'

export const middleware = async (request: NextRequest) => {
	// Usuario logueado  y existe token
	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET
	})

	const { pathname } = request.nextUrl


	if (token || pathname.includes('/api/auth') || pathname.includes('/_next')) {
		if (pathname === '/login') {
			return NextResponse.redirect(new URL('/', request.url))
		}

		return NextResponse.next()
	}

	// Redirecciona a login si no hay token y solicita ruta protegida
	if (!token && pathname !== '/login') {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}
