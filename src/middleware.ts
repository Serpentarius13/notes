import { getToken } from "next-auth/jwt";
import { baseUrl } from "./features/constants/baseUrl";
import { NextResponse } from "next/server";

export default async function middleware(request: Request | any) {
  const token = await getToken({ req: request, raw: true });
  console.log(token, request.url);
  if (
    (request.url.includes("/chat") ||
      request.url.includes("/documents") ||
      request.url.includes("/note") ||
      request.nextUrl.pathname === "/") &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.url.includes("/login") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const matcher = ["/", "/login", "/chat", "/documents", "/note/:path*"];
