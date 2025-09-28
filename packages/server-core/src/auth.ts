import { betterAuth, type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getEnv } from "./env";
import { sendWelcomeEmail } from "./email";
import { prisma } from "./prisma";

const DEFAULT_COOKIE_ATTRIBUTES: NonNullable<
	BetterAuthOptions["advanced"]
>["defaultCookieAttributes"] = {
	sameSite: "none",
	secure: true,
	httpOnly: true,
};

export const createAuth = (
	overrides: Partial<BetterAuthOptions> = {},
): ReturnType<typeof betterAuth> => {
	const env = getEnv();
	const {
		hooks: _overrideHooks,
		emailAndPassword: overrideEmailAndPassword,
		advanced: overrideAdvanced,
		database: overrideDatabase,
		trustedOrigins: overrideTrustedOrigins,
		databaseHooks: overrideDatabaseHooks,
		...restOverrides
	} = overrides;

	return betterAuth<BetterAuthOptions>({
		database:
			overrideDatabase ??
			prismaAdapter(prisma, {
				provider: "postgresql",
			}),
		trustedOrigins: overrideTrustedOrigins ?? [env.CORS_ORIGIN],
		emailAndPassword: {
			enabled: true,
			minPasswordLength: 8,
			...overrideEmailAndPassword,
		},
		advanced: {
			defaultCookieAttributes: DEFAULT_COOKIE_ATTRIBUTES,
			...overrideAdvanced,
		},
		databaseHooks: {
			...(overrideDatabaseHooks ?? {}),
			user: {
				...(overrideDatabaseHooks?.user ?? {}),
				create: {
					...(overrideDatabaseHooks?.user?.create ?? {}),
					after: async (user: unknown, ctx: unknown) => {
						const prev = overrideDatabaseHooks?.user?.create?.after as
							| ((user: unknown, ctx: unknown) => Promise<unknown>)
							| undefined;
						if (prev) await prev(user, ctx);

						try {
							const u = user as { email?: string | null; name?: string | null };
							if (u?.email) {
								await sendWelcomeEmail(env, {
									email: u.email,
									name: u.name ?? undefined,
								});
							}
						} catch (e) {
							console.error("[auth] Failed to send welcome email:", e);
						}
					},
				},
			},
		},
		...restOverrides,
	});
};

export type AuthInstance = ReturnType<typeof createAuth>;
