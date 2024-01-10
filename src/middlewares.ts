import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest){
    const path = req.nextUrl.pathname
    const token = req.cookies.get('userName')?.value || ''
    const isPublicPath = path == '/login'
    
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/prices', req.nextUrl))

    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
}
export const config = {
    matcher: [
        '/',
        '/prices',
        '/config',    
        '/calculate',
        '/login'
    ]
  }