import { createCookie, redirect } from "@remix-run/node";

export const authCookie = createCookie("auth", {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  secure: true,
  secrets: ["default"], // Use process.env.COOKIE_SECRET
  maxAge: 60 * 60 * 24 * 7, // 1 week
});

export async function requireAuthCookie(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const authToken = (await authCookie.parse(cookieHeader)) || {};
  if (authToken) {
    return redirect("/");
  }
  return {};
}
