import { Container } from "@/components/layout/container";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex-1 bg-background">
			<Container className="space-y-8 py-10">{children}</Container>
		</main>
	);
}
