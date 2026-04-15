import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "ride_story_admin";

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "local-dev-admin-secret";
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "change_me"
  };
}

export function createSessionToken(username: string) {
  const signature = createHmac("sha256", getSecret()).update(username).digest("hex");
  return `${username}.${signature}`;
}

export function verifySessionToken(token?: string | null) {
  if (!token) {
    return false;
  }

  const [username, signature] = token.split(".");

  if (!username || !signature) {
    return false;
  }

  const expected = createHmac("sha256", getSecret()).update(username).digest("hex");

  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}
