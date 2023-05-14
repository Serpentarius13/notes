import { getToken } from "next-auth/jwt";
import { baseUrl } from "./features/constants/baseUrl";
import { NextResponse } from "next/server";

export default async function middleware(request: Request | any) {
  const token = await getToken({ req: request, raw: true });

  if (request.url === baseUrl && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.url.includes("/login") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const matcher = ["/", "/login"];
