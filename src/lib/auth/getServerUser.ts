import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthUser } from "@/store/auth.store";

export async function getServerUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.decode(token) as JwtPayload;
    if (!decoded || !decoded.exp) return null;

    // Check expiry
    if (decoded.exp * 1000 < Date.now()) return null;

    return {
      id: decoded.id as string,
      name: decoded.name as string,
      email: decoded.email as string,
      role: decoded.role as AuthUser["role"],
    };
  } catch {
    return null;
  }
}