import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Authentication Checks
    const token = request.cookies.get("token")?.value;
    const role = request.cookies.get("role")?.value;

    // Parse locale from pathname
    const pathnameRegex = /^\/(en|ar)(\/.*)?$/;
    const match = pathname.match(pathnameRegex);
    
    const locale = match ? match[1] : 'en';
    const corePath = match ? (match[2] || '/') : pathname;

    // Protection for /profile
    if (corePath.startsWith("/profile") && !token) {
        return NextResponse.redirect(new URL(`/${locale}/auth`, request.url));
    }

    // Redirect /auth to /profile if already logged in
    if (corePath.startsWith("/auth") && token) {
        return NextResponse.redirect(new URL(`/${locale}/profile`, request.url));
    }

    // Admin Dashboard protection
    if (corePath.startsWith("/dashboard")) {
        if (!token) {
            return NextResponse.redirect(new URL(`/${locale}/auth`, request.url));
        }
        if (role !== "admin") {
            return NextResponse.redirect(new URL(`/${locale}`, request.url)); 
        }
    }

    // Delegate to next-intl for locale handling
    return intlMiddleware(request);
}

export const config = {
    // Matcher for internationalization and protected routes
    matcher: [
        '/', 
        '/(ar|en)/:path*',
        '/((?!api|_next|_vercel|.*\\..*).*)'
    ]
};