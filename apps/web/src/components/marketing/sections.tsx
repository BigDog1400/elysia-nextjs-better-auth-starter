"use client";

import Link from "next/link";
import {
  Bot,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Zap,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const logos = [
	"Elysia",
	"Next.js",
	"better-auth",
	"shadcn/ui",
];

const features = [
	{
		title: "Type-safe from request to UI",
		description:
			"Share contracts across Elysia and Next.js so every call is validated and fully typed.",
		icon: ShieldCheck,
	},
	{
		title: "Authentication included",
		description:
			"better-auth is wired up with Prisma so you can handle sign ups, sessions, and cookies in minutes.",
		icon: Bot,
	},
	{
		title: "Email ready to send",
		description:
			"Trigger transactional emails through Resend with a simple helper and environment-aware fallbacks.",
		icon: UploadCloud,
	},
	{
		title: "Modern UI building blocks",
		description:
			"shadcn/ui components, Tailwind, and sensible defaults give you a polished front end from day one.",
		icon: MessageCircle,
	},
];

const workflow = [
	{
		title: "Install & configure",
		description:
			"Copy the template, set your environment variables, and run the bundled database push command.",
	},
	{
		title: "Customize UI & routes",
		description:
			"Update the Next.js pages, tweak the Elysia routes, and share types through the api-contract package.",
	},
	{
		title: "Deploy anywhere",
		description:
			"Bun-friendly config works locally, on Docker, or any edge runtime that supports JavaScript modules.",
	},
];

const faqs = [
	{
		question: "Do I need to bring my own auth setup?",
		answer:
			"No. better-auth is preconfigured with Prisma models so password flows and sessions work out of the box.",
	},
	{
		question: "Can I use a different email provider?",
		answer:
			"Yes. Swap the Resend helper with your provider of choice while keeping the same email abstraction.",
	},
	{
		question: "Is the styling opinionated?",
		answer:
			"The project ships with Tailwind and shadcn/ui, but you can replace components or tokens without touching core logic.",
	},
	{
		question: "What about database migrations?",
		answer:
			"Prisma schema files live in the server-core package, and scripts are ready for `prisma migrate` or `db push`.",
	},
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border bg-muted/40 px-6 py-14 shadow-sm md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12">
        <div className="flex w-full flex-col gap-6 text-center">
          <div className="space-y-4">
            <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Full-stack starter template
            </span>
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary/70">
                Elysia · Next.js · better-auth
              </p>
              <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
                Launch faster with a batteries-included JavaScript stack
              </h1>
            </div>
            <p className="text-balance text-muted-foreground sm:text-lg">
              Authentication, email helpers, shared API contracts, and shadcn/ui components are ready on day one—focus on shipping your product.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/login">Explore the dashboard</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="#features">Browse the stack</Link>
            </Button>
          </div>
        </div>
        <div className="grid w-full gap-4 text-sm text-muted-foreground sm:grid-cols-3">
          <div className="rounded-xl border bg-background/80 px-5 py-4 text-left">
            <p className="font-medium text-foreground">Type-safe APIs</p>
            <p>Shared contracts keep frontend queries and Elysia routes in sync.</p>
          </div>
          <div className="rounded-xl border bg-background/80 px-5 py-4 text-left">
            <p className="font-medium text-foreground">Auth included</p>
            <p>better-auth + Prisma provide secure session handling out of the box.</p>
          </div>
          <div className="rounded-xl border bg-background/80 px-5 py-4 text-left">
            <p className="font-medium text-foreground">Design system ready</p>
            <p>shadcn/ui and Tailwind deliver accessible, themeable components.</p>
          </div>
        </div>
      </div>
      <Zap className="absolute -right-8 -top-8 h-28 w-28 text-primary/10" />
    </section>
  );
}

export function LogosSection() {
  return (
    <section className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6">
      {logos.map((label) => (
        <span
          key={label}
          className="text-muted-foreground/80 text-sm tracking-wide uppercase"
        >
          {label}
        </span>
      ))}
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-semibold">Everything you need to go from idea to MVP</h2>
        <p className="text-muted-foreground">
          Opinionated defaults let you focus on product logic instead of boilerplate.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map(({ title, description, icon: Icon }) => (
          <Card key={title} className="h-full">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function WorkflowSection() {
  return (
    <section className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-semibold">Launch in three guided steps</h2>
        <p className="text-muted-foreground">
          Follow a simple flow to configure the stack, customize features, and ship confidently.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {workflow.map(({ title, description }, index) => (
          <Card key={title} className="h-full">
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <CheckCircle2 className="h-4 w-4" />
                Step {index + 1}
              </div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-semibold">Loved by product teams and consultants</h2>
        <p className="text-muted-foreground">
          Builders choose this starter to skip setup time and keep shipping momentum high.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardDescription>Product Studio · São Paulo</CardDescription>
            <CardTitle>“We onboarded clients in the first afternoon.”</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>
              The template gave us auth, email, and UI out of the box.
              My team could focus on domain logic instead of wiring infrastructure yet again.
            </p>
            <div className="flex items-center gap-3 text-sm text-foreground">
              <div className="h-10 w-10 rounded-full bg-primary/10" />
              <div>
                <p className="font-medium">Larissa Mendes</p>
                <p className="text-muted-foreground">Founder, Parallel North</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>SaaS · Miami</CardDescription>
            <CardTitle>“Infrastructure handled, features shipped.”</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>
              We swapped the demo data for our own APIs in a day.
              The shared contract package kept type safety tight across teams.
            </p>
            <div className="flex items-center gap-3 text-sm text-foreground">
              <div className="h-10 w-10 rounded-full bg-primary/10" />
              <div>
                <p className="font-medium">Ethan Ross</p>
                <p className="text-muted-foreground">CTO, Waveform Labs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-semibold">Frequently asked questions</h2>
        <p className="text-muted-foreground">
          Everything you need to know before customizing the starter kit.
        </p>
      </div>
      <div className="grid gap-4">
        {faqs.map(({ question, answer }) => (
          <Card key={question} className="border-muted/60 bg-background/80">
            <CardHeader>
              <CardTitle className="text-lg">{question}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{answer}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="rounded-3xl border bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 py-12 shadow-sm md:px-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-semibold">
          Start building with a head start
        </h2>
        <p className="text-muted-foreground">
          Duplicate the repo, wire up your data, and ship a polished experience without reinventing the stack.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/login">Go to dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="mailto:hello@example.dev">Get support</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
