import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import Dashboard from "./dashboard";
import { headers } from "next/headers";

export default async function DashboardPage() {
	const session = await authClient.getSession({
		fetchOptions: {
			headers: await headers(),
		},
	});

	if (!session.data) {
		redirect("/login");
	}

	return (
		<section className="space-y-6">
			<div className="space-y-2">
				<h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
				<p className="text-muted-foreground">
					Welcome back{session.data.user.name ? `, ${session.data.user.name}` : ""}. Here's a quick overview of your starter project.
				</p>
			</div>
			<Dashboard />
		</section>
	);
}
