// middleware.ts
import { NextRequest, NextResponse } from "next/server"
// import { verifyAuthToken } from "./lib/auth" // Custom helper you’ll write

// Define protected routes and roles (if needed)
const protectedRoutes = ["/finance"]
const adminRoutes = ["/admin"]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const userData = req.cookies.get("user")?.value

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtected && !userData) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("redirect", pathname)

    return NextResponse.redirect(loginUrl)
  }


  if (userData) {
    try {

      const user = userData && JSON.parse(userData as string)

      // Optional: protect admin-only routes
      if (user && user?.role !== "super_admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
      }

      // You can also attach user info to the request
      const requestHeaders = new Headers(req.headers)
      requestHeaders.set("x-user-id", user.id)
      return NextResponse.next({ request: { headers: requestHeaders } })

      return NextResponse.next()
    } catch (error) {
      // Invalid token
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  return NextResponse.next()
}

// Apply only to specific routes
export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"] // or  ["/dashboard/:path*", "/admin/:path*"],
}
