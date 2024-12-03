import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest): NextResponse {
    console.log('Middleware executed for:', req.url);

  // Fetch the cookie
  const authToken = "abc";
  // const authToken = req.cookies.get('abc');
  

  console.log('Auth Token:', authToken); // Debugging: Log the token value

  // If no authToken, redirect to /login
  if (!authToken) {
    console.log('No auth token found. Redirecting to /.');
    return NextResponse.redirect(new URL('/', req.url));
  }

  console.log('Auth token found. Proceeding to the requested route.');
  // Allow the request if the token exists
  return NextResponse.next();
}

export const config = {
  matcher: '/buildresume', // Apply only to /buildresume route
};
