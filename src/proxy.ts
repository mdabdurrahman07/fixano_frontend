import { jwtUtils } from "@/utils/jwt";
import { getNewAccessToken } from "@/utils/refreshToken";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/services", "/technicians", "/about-us"];

export const proxy = async (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;

  const cookieStore = await cookies();

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    //access token has expired but refresh token is valid, get new access token from backend
    const result = await getNewAccessToken();

    if (result.success) {
      const newAccessToken = result.data.accessToken;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      accessToken = newAccessToken;
      decodedAccessToken = jwtUtils.verifyToken(
        accessToken!,
        process.env.JWT_ACCESS_SECRET as string,
      );
    }
  }

  let userRole = null;

  if (!decodedAccessToken?.success) {
    //token has expired or is invalid, clear the cookies
    cookieStore.delete("accessToken");
    // return NextResponse.redirect(new URL('/login', request.url));
  }

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  //user is logged in and trying to access login or register page, redirect to dashboard or root home page
  if (accessToken && AUTH_ROUTES.includes(pathName)) {
    if (userRole === "CUSTOMER") {
      return NextResponse.redirect(new URL("/user-dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else if (userRole === "TECHNICIAN") {
      return NextResponse.redirect(
        new URL("/technician-dashboard", request.url),
      );
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathName === route || pathName.startsWith(route + "/"),
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathName === route || pathName.startsWith(route + "/"),
  );

  // Authenticated Pages Protection : Authorization is not handled yet
  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirectTo", pathName);

    return NextResponse.redirect(loginUrl);
  }
  if (pathName.startsWith("/user-dashboard") && userRole !== "CUSTOMER") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathName.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathName.startsWith("/technician-dashboard") &&
    userRole !== "TECHNICIAN"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
