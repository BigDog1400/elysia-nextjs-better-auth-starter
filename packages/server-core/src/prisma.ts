import { PrismaClient } from "../prisma/generated/client/client";

const globalForPrisma = globalThis as typeof globalThis & {
	_prisma?: PrismaClient;
};

export const prisma: PrismaClient =
	globalForPrisma._prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
	globalForPrisma._prisma = prisma;
}

export type { Prisma } from "@prisma/client";
