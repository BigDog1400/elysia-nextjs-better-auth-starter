import dotenv from "dotenv";
import { z } from "zod";

let hasLoaded = false;
let cachedEnv: Env | null = null;

export interface LoadEnvOptions {
	path?: string;
	override?: boolean;
}

const envSchema = z
	.object({
		DATABASE_URL: z
			.string()
			.min(1, "DATABASE_URL is required"),
		CORS_ORIGIN: z
			.string()
			.min(1, "CORS_ORIGIN is required"),
		BETTER_AUTH_SECRET: z
			.string(),
		BETTER_AUTH_URL: z
			.string()
			.url("BETTER_AUTH_URL must be a valid URL"),
		RESEND_API_KEY: z.string().optional(),
		RESEND_FROM_EMAIL: z.string().email().optional(),
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
	})
	.superRefine((env, ctx) => {
		if (env.RESEND_API_KEY && !env.RESEND_FROM_EMAIL) {
			ctx.addIssue({
				path: ["RESEND_FROM_EMAIL"],
				code: z.ZodIssueCode.custom,
				message:
					"RESEND_FROM_EMAIL is required when RESEND_API_KEY is provided.",
			});
		}
	});

export type Env = z.infer<typeof envSchema>;

export const loadEnv = (options?: LoadEnvOptions) => {
	if (hasLoaded) return;
	dotenv.config(options);
	hasLoaded = true;
};

export const getEnv = (options?: LoadEnvOptions): Env => {
	if (!cachedEnv) {
		loadEnv(options);
		const parsed = envSchema.safeParse({
			DATABASE_URL: process.env.DATABASE_URL,
			CORS_ORIGIN: process.env.CORS_ORIGIN,
			BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
			BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
			RESEND_API_KEY: process.env.RESEND_API_KEY,
			RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
			NODE_ENV: process.env.NODE_ENV ?? "development",
		});

		if (!parsed.success) {
			const flattened = parsed.error.flatten();
			const fieldMessages = Object.entries(flattened.fieldErrors)
				.filter(([, messages]) => messages && messages.length > 0)
				.map(([field, messages]) => `${field}: ${messages!.join("; ")}`);
			const formMessages = flattened.formErrors ?? [];
			const combined = [...fieldMessages, ...formMessages];
			const details = combined.length > 0 ? combined.join(", ") : parsed.error.message;
			throw new Error(`Invalid environment configuration: ${details}`);
		}

		cachedEnv = parsed.data;
	}

	return cachedEnv;
};
