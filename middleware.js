import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

export const supported_locales = ["en", "sv", "da", "no", "fi"];
const defaultLocale = "en";

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = supported_locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Special case of requesting /sitemap.xml
  if (pathname === "/sitemap.xml") return;

  // Redirect if there is no locale
  let headers = { "accept-language": request.headers.get("Accept-Language") };
  // Get list of accepted languages, ordered by client preference
  let languages = new Negotiator({ headers }).languages();

  const locale = match(languages, supported_locales, defaultLocale);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - icon.png (icon file)
     */
    "/((?!api|_next/static|_next/image|images|icon.ico).*)",
  ],
};
