import { getPreferredLocale } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";

const notPrivateRoutes: RegExp[]  = [
  /^(?:\/(?:en|fa))?\/sign-in$/,
  /^(?:\/(?:en|fa))?\/sign-up$/,
];

const privateRoutes: RegExp[] = [/^(?:\/(?:en|fa))?\/admin-dashboard$/];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoggedIn =
    request.cookies.get("refresh_token") && request.cookies.get("access_token");

  const pathnameLocale = pathname.match(/^\/(en|fa)/)?.[1];
  const pathnameHasLocale = !!pathnameLocale;
  const locale =
    pathnameLocale ||
    getPreferredLocale(request.headers.get("accept-language") || undefined);

  if (
    isLoggedIn &&
    notPrivateRoutes.some((pathRegex) => pathRegex.test(pathname))
  ) {
    request.nextUrl.pathname = `/${locale}`;
    return NextResponse.redirect(request.nextUrl);
  }

  if (
    !isLoggedIn &&
    privateRoutes.some((pathRegex) => pathRegex.test(pathname))
  ) {
    request.nextUrl.pathname = `/${locale}`;
    return NextResponse.redirect(request.nextUrl);
  }

  if (pathnameHasLocale) return;

  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next).*)"],
};
