import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { loadEnv } from "./env";
import { dashboardRoutes } from "./routes/dashboard";

export type AuthRequestHandler = (request: Request) => Promise<Response>;

type CorsOptions = Parameters<typeof cors>[0];


export interface CreateAppOptions {
	cors?: CorsOptions | boolean;
	authHandler: AuthRequestHandler;
}

const defaultCorsOptions: CorsOptions = {
	origin: "",
	methods: ["GET", "POST", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
};

export const createApp = ({
    cors: corsOptions = defaultCorsOptions,
    authHandler,
}: CreateAppOptions) => {
    loadEnv();

    const app = new Elysia();

    if (corsOptions !== false) {
        const resolvedCorsOptions: CorsOptions =
            corsOptions === true ? defaultCorsOptions : (corsOptions as CorsOptions);
        app.use(cors(resolvedCorsOptions ?? defaultCorsOptions));
    }

	return app
		.all("/api/auth/*", async ({ request, status }) => {
			if (["POST", "GET"].includes(request.method)) {
				return authHandler(request);
			}
			return status(405);
		})
		.get("/", () => "OK")
		.get("/hello", () => ({ message: "Hello from Elysia!" }))
		.use(dashboardRoutes);
};

export type App = ReturnType<typeof createApp>;

export { createAuth, type AuthInstance } from "./auth";
export type { Prisma } from "./prisma";
