import { createApp, createAuth } from "@wara/server-core";
import type { App } from "@wara/api-contract";

const auth = createAuth();

const app: App = createApp({
	cors: {
		origin: process.env.CORS_ORIGIN || "",
		methods: ["GET", "POST", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	},
	authHandler: (request) => auth.handler(request),
});


app.listen(4002, () => {
	console.log("Server is running on http://localhost:4002");
});

export default app;
