import { NextRequest, NextResponse } from "next/server"
import { hasPermission } from "./utils/hasPermission"

// Define protected routes and roles (if needed)
const protectedRoutes = ["/finance", "/add", "/edit", "/profile", "/manage"]
const adminRoutes = ["/manage"]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const userData = req.cookies.get("user")?.value

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))

  if (isProtected && !userData) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("redirect", pathname)

    return NextResponse.redirect(loginUrl)
  }


  if (userData) {
    try {

      const user = userData && JSON.parse(userData as string)

      if (user && user?.role === "super_admin") {
        return NextResponse.next()
      }

      if (isAdminRoute) {
        console.log(hasPermission(user, ["manage:*"]))
        if (!hasPermission(user, ["manage:*"])) {
          return NextResponse.redirect(new URL("/unauthorized", req.url))
        }
      }

      const requestHeaders = new Headers(req.headers)
      requestHeaders.set("x-user-id", user.id)

      return NextResponse.next({ request: { headers: requestHeaders } })
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"] // or  ["/dashboard/:path*", "/admin/:path*"],
}
