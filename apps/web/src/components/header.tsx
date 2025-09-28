"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import { Container } from "./layout/container";

export default function Header() {
	const links = [
		{ to: "/", label: "Home" },
		{ to: "/#features", label: "Features" },
		{ to: "/#faq", label: "FAQ" },
		{ to: "/dashboard", label: "Dashboard" },
	] as const;

	return (
		<header className="border-b bg-background/80 backdrop-blur">
			<Container className="flex items-center justify-between gap-4 py-4">
				<Link href="/" className="text-sm font-semibold tracking-wide text-primary">
					Starter Kit
				</Link>
				<nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground sm:gap-6">
					{links.map(({ to, label }) => (
						<Link
							key={to}
							href={to}
							className="transition-colors hover:text-primary"
						>
							{label}
						</Link>
					))}
				</nav>
				<div className="flex items-center gap-2">
					<ModeToggle />
					<UserMenu />
				</div>
			</Container>
		</header>
	);
}
