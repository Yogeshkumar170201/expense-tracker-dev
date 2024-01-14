import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import pino from 'pino';

const logger = pino({ level: 'debug' });

const publicPaths = [
  'http://localhost:3000/',
  'http://localhost:3000/signin',
  'http://localhost:3000/forgotPassword'
]

const privatePaths = [
  'http://localhost:3000/dashboard',
  'http://localhost:3000/transactions',
  'http://localhost:3000/incomes',
  'http://localhost:3000/expenses'
]


export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || '';
  if(token.length>0 && publicPaths.includes(request.url)){
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  else if(token.length===0 && privatePaths.includes(request.url)){
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/signin',
    '/forgotPassword',
    '/transactions',
    '/incomes',
    '/expenses'
  ]
}