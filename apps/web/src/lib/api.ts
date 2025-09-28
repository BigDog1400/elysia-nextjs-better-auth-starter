import { edenTreaty } from "@elysiajs/eden";
import type { App } from "@wara/api-contract";

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4002";

export const edenClient = edenTreaty<App>(API_BASE_URL);
