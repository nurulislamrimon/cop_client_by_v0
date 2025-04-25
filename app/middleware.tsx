// middleware.ts
import { NextRequest, NextResponse } from "next/server"
// import { verifyAuthToken } from "./lib/auth" // Custom helper you’ll write

// Define protected routes and roles (if needed)
const protectedRoutes = ["/dashboard", "/admin"]
const adminRoutes = ["/admin"]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get("token")?.value

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))

  // If route is protected but no token
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // If token exists, verify it
  if (token) {
    try {
      // const user = await verifyAuthToken(token)

      // // Optional: protect admin-only routes
      // if (isAdminRoute && user?.role !== "admin") {
      //   return NextResponse.redirect(new URL("/unauthorized", req.url))
      // }

      // // You can also attach user info to the request
      // const requestHeaders = new Headers(req.headers)
      // requestHeaders.set("x-user-id", user.id)
      // return NextResponse.next({ request: { headers: requestHeaders } })

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
  matcher: ["/dashboard/:path*", "/admin/:path*"], // or ["/((?!api|_next/static|favicon.ico).*)"]
}
