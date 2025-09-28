import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import {
	CtaSection,
	FaqSection,
	FeaturesSection,
	HeroSection,
	LogosSection,
	TestimonialsSection,
	WorkflowSection,
} from "@/components/marketing/sections";

export const metadata: Metadata = {
	title: "Starter Kit | Full-stack Hello World",
	description:
		"A minimal Elysia + Next.js starter with better-auth, email examples, and shadcn/ui components.",
	openGraph: {
		title: "Starter Kit | Full-stack Hello World",
		description:
			"Spin up a type-safe full-stack template with authentication, styling, and email ready to go.",
		url: "https://starter-kit.local/",
		siteName: "Starter Kit",
		images: [
			{
				url: "https://starter-kit.local/og-image.png",
				width: 1200,
				height: 630,
				alt: "Starter Kit preview",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Starter Kit | Full-stack Hello World",
		description:
			"Ship faster with a batteries-included template for Elysia, Next.js, and better-auth.",
		images: ["https://starter-kit.local/og-image.png"],
	},
};

export default function HomePage() {
	return (
		<Container className="flex flex-col gap-16 py-16">
			<HeroSection />
			<LogosSection />
			<FeaturesSection />
			<WorkflowSection />
			<TestimonialsSection />
			<FaqSection />
			<CtaSection />
		</Container>
	);
}
