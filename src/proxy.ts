import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { resolveTenantFromHost } from "@/lib/tenant-resolver";

const TENANT_HEADER = "x-tenant-id";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Auth admin — pakai NextAuth proxy
  if (pathname.startsWith("/admin")) {
    if (pathname.startsWith("/admin/login")) return NextResponse.next();
    const session = await auth();
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(TENANT_HEADER, String(1));
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Tenant resolution untuk halaman publik — DICACHE in-memory (bukan query DB tiap request)
  if (
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/favicon") &&
    pathname !== "/robots.txt" &&
    pathname !== "/sitemap.xml"
  ) {
    const host = request.headers.get("host") ?? "";
    const tenantId = await resolveTenantFromHost(host);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(TENANT_HEADER, String(tenantId));
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon|robots|sitemap).*)"],
};
