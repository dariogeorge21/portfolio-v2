import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(process.env.NODE_ENV === "development"
      ? { log: ["query", "error", "warn"] as const }
      : {}),
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
