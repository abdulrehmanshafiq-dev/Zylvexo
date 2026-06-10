import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET!;

export function signToken(payload: object, expiresIn: string = "7d"): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn,
  } as jwt.SignOptions);
}

export function verifyToken(token: string): object | null {
  try {
    return jwt.verify(token, JWT_SECRET) as object;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

export function getTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const match = cookieHeader.match(/auth-token=([^;]+)/);
  return match ? match[1] : null;
}

export function isAdminRequest(request: Request): boolean {
  const token = getTokenFromRequest(request);
  if (!token) return false;
  return verifyToken(token) !== null;
}
