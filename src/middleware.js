import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routesUrl } from "./utils/pagesurl";
// Define which routes are protected (require authentication)
export const ProtectedRoutes = [routesUrl.products, routesUrl.user];
// Define public routes (accessible without login)
export const UnprotectedRoutes = [routesUrl.signIn];

// Middleware function
export async function middleware(request) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;
  // Check if the route is protected
  const isProtectedRoute = ProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  // Check if the route is UnprotectedRoutes
  const isUnprotectedRoute = UnprotectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  // check if the user is authorized and token is  avaliable
  if (isUnprotectedRoute && token) {
    const redirectUrl = ProtectedRoutes[0];
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }
  // check if the user is Unauthorized and token is not avaliable
  if (isProtectedRoute && !token) {
    const redirectUrl = UnprotectedRoutes[0];
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }
    // Allow request to proceed if route access is valid
  return NextResponse.next();
}
// Apply middleware only to protected routes
export const config = {
  matcher: [ProtectedRoutes],
};
