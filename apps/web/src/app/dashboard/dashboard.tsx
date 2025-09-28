"use client";
import Loader from "@/components/loader";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { edenClient } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";


const queryKey = ["dashboard", "summary"] as const;

const useDashboardSummary = () =>
	useQuery({
		queryKey,
		staleTime: 30_000,
		queryFn: async () => {
			const { data, error } = await edenClient.dashboard.summary.get();
			if (error) {
				throw error;
			}
			return data;
		},
	});

const formatDateTime = (iso: string) => {
	const date = new Date(iso);
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	})}`;
};

export default function Dashboard() {
	const {
		data: summary,
		error,
		isPending,
		refetch,
	} = useDashboardSummary();

	if (isPending) {
		return <Loader />;
	}

	if (error) {
		return (
			<Card className="mx-auto max-w-3xl">
				<CardHeader>
					<CardTitle>Unable to load dashboard</CardTitle>
					<CardDescription>
						{error instanceof Error ? error.message : "Unknown error"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button onClick={() => refetch()}>Try again</Button>
				</CardContent>
			</Card>
		);
	}

	if (!summary) {
		return null;
	}

	const { message, serverTime, tips } = summary as {
		message: string;
		serverTime: string;
		tips?: string[];
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>{message}</CardTitle>
				<CardDescription>
					Last updated at {formatDateTime(serverTime)}
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3">
				<p className="text-sm text-muted-foreground">
					Use this space to share next steps with your team or jot down ideas for your product.
				</p>
				{tips && tips.length > 0 && (
					<ul className="list-disc space-y-1 pl-6 text-sm text-muted-foreground">
						{tips.map((tip) => (
							<li key={tip}>{tip}</li>
						))}
					</ul>
				)}
			</CardContent>
		</Card>
	);
}
