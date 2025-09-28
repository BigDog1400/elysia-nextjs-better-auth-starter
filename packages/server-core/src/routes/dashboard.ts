import { Elysia } from "elysia";

export const dashboardRoutes = new Elysia({ prefix: "/dashboard" }).get(
	"/summary",
	() => {
		const now = new Date();

		return {
			message: "Your project is ready to customize.",
			serverTime: now.toISOString(),
			tips: [
				"Update this page to showcase your product.",
				"Wire new routes in packages/server-core/src to build your API.",
				"Use the shared auth client for guarded pages.",
			],
		};
	},
);
