import { NextRequest, NextResponse } from "next/server";
import { routesConstain, routesPublic } from "./routes";

export function middleware(request: NextRequest) {
	// Get token from cookies
	const accessToken = request.cookies.get('accessToken')?.value;

	const { pathname } = request.nextUrl;

	const isPublicRoute = routesPublic.some(route => pathname.startsWith(route.path));

	// 3. Redirect logic
  // If NOT logged in + accessing a protected route → redirect to login
	if (!accessToken && !isPublicRoute) {
		const loginUrl = new URL('/login', request.url);
		return NextResponse.redirect(loginUrl);
	}

	// If ALREADY logged in + accessing the login page → redirect to dashboard
	if (accessToken && isPublicRoute) {
		const dashboardUrl = new URL(routesConstain.dashboards.path, request.url);
		return NextResponse.redirect(dashboardUrl);
	}

  // 4. Allow the request to continue
	return NextResponse.next();
}

// 5. Config matcher - Which routes will trigger the middleware
export const config = {
  matcher: [
    // Protect all routes except:
    // - API routes
    // - Static files (_next/static)
    // - Images (_next/image)
    // - Favicon, images, fonts
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ttf)$).*)',
  ],
};
