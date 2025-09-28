import { Container } from "@/components/layout/container";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex flex-1 items-center justify-center bg-muted/40">
			<Container className="py-16">
				<div className="mx-auto w-full max-w-md">{children}</div>
			</Container>
		</main>
	);
}
