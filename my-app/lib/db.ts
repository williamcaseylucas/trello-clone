import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// hot reload with next.js makes sure we use cache prisma client and don't generate  multiple
// globalThis is excluded from hot reload
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
