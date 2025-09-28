import { Resend } from "resend";
import type { Env } from "./env";

interface SendWelcomeEmailInput {
  email: string;
  name?: string;
}

const getResendClient = (env: Env) => {
  if (!env.RESEND_API_KEY) return null;
  try {
    return new Resend(env.RESEND_API_KEY);
  } catch (e) {
    console.warn("[email] Failed to initialize Resend client:", e);
    return null;
  }
};

export const sendWelcomeEmail = async (
  env: Env,
  { email, name }: SendWelcomeEmailInput,
) => {
  const resend = getResendClient(env);
  const from = env.RESEND_FROM_EMAIL;

  if (!resend || !from) {
    // Soft-fail in development if email isn't configured; don't block sign-up.
    console.info(
      "[email] Skipping welcome email: RESEND not configured (RESEND_API_KEY/RESEND_FROM_EMAIL).",
    );
    return;
  }

	try {
		await resend.emails.send({
			from,
			to: email,
			subject: "Welcome to your new starter project",
			html: `
	        <h1>Welcome${name ? `, ${name}` : ""}!</h1>
	        <p>
	          Thanks for trying this starter template. You're all set to build your next idea.
	        </p>
	        <p>
	          Explore the dashboard, hook up your APIs, and customize the experience to fit your product.
	        </p>
	      `,
		});
	} catch (e) {
    console.error("[email] Failed to send welcome email via Resend:", e);
  }
};
