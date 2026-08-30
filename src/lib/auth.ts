import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "./prisma";
import { SessionUser } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET || "blue-workforce-connect-2026-secret-key";
const COOKIE_NAME = "bwc_auth_token";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: SessionUser): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): SessionUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionUser;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function getFullSessionUser(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    include: {
      workerProfile: true,
      employerProfile: {
        include: { company: true }
      }
    }
  });

  if (!user || user.isSuspended) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as any,
    phone: user.phone,
    avatar: user.avatar,
    isVerified: user.isVerified,
    workerProfileId: user.workerProfile?.id,
    employerProfileId: user.employerProfile?.id,
    companyId: user.employerProfile?.companyId,
  };
}

export const DEMO_CREDENTIALS = {
  worker: { email: "worker@demo.com", password: "Demo@1234", role: "WORKER" },
  employer: { email: "employer@demo.com", password: "Demo@1234", role: "EMPLOYER" },
  admin: { email: "admin@demo.com", password: "Demo@1234", role: "ADMIN" }
};
