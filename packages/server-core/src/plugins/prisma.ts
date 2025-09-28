import { Elysia } from "elysia";
import { prisma } from "../prisma";

export const prismaPlugin = new Elysia().decorate("prisma", prisma);
