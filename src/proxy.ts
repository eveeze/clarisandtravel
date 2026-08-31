import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const TENANT_HEADER = "x-tenant-id";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Auth admin — pakai NextAuth proxy
  if (pathname.startsWith("/admin")) {
    // Login page gak perlu auth
    if (pathname.startsWith("/admin/login")) return NextResponse.next();
    // Cek session
    const session = await auth();
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    // Lanjut dengan tenant header
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(TENANT_HEADER, String(1));
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Tenant resolution untuk halaman publik (content)
  if (
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/favicon") &&
    pathname !== "/robots.txt" &&
    pathname !== "/sitemap.xml"
  ) {
    const host = request.headers.get("host") ?? "";
    const parts = host.split(".");
    let tenantId = 1; // default tenant (jogja)

    // Subdomain: "jogja.domain.com" → slug = "jogja"
    if (parts.length >= 3 && parts[0] !== "www") {
      try {
        const tenant = await prisma.tenant.findFirst({
          where: { slug: parts[0], isActive: true },
          select: { id: true },
        });
        if (tenant) tenantId = tenant.id;
      } catch {
        // Fallback default
      }
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(TENANT_HEADER, String(tenantId));
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon|robots|sitemap).*)"],
};
