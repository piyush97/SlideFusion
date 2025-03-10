import { PrismaClient } from "@prisma/client";

declare global {
  //  eslint-disable-next-line
  var prisma: PrismaClient | undefined;
}

export const client = globalThis.prisma;
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = new PrismaClient();
}
