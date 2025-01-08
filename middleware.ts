import { NextRequest, NextResponse, userAgent } from "next/server";
import { getSession } from "./lib/actions/session";
import { DEFAULT_LOGIN_REDIRECT, LOGGED_OUT_REDIRECT } from "./lib/routes";
import { Role } from "./lib/types/user.types";

export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;

  const session = await getSession()

  const isLoggedIn = session && session.user.role == Role.ADMIN


  const isAuthRoute = nextUrl.pathname.includes("/auth")

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  }
  else {
    if (!isLoggedIn) {
      return Response.redirect(new URL(LOGGED_OUT_REDIRECT, nextUrl));

    }
  }

}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
