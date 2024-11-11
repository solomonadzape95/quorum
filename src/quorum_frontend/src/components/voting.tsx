import { useState } from "react";
import confetti from "canvas-confetti";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { type ChartConfig } from "@/components/ui/chart";

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "#2563eb",
	},
	mobile: {
		label: "Mobile",
		color: "#60a5fa",
	},
} satisfies ChartConfig;
interface Candidate {
	id: number;
	name: string;
	mandate: string;
	image: string;
	votes: number;
}

const candidates: Candidate[] = [
	{
		id: 1,
		name: "Alex Thompson",
		mandate: "Transparency & Innovation",
		image: "/placeholder.svg?height=100&width=100",
		votes: 145,
	},
	{
		id: 2,
		name: "Sarah Chen",
		mandate: "Community Growth",
		image: "/placeholder.svg?height=100&width=100",
		votes: 132,
	},
	{
		id: 3,
		name: "Marcus Rodriguez",
		mandate: "Technical Development",
		image: "/placeholder.svg?height=100&width=100",
		votes: 97,
	},
];

export default function ElectionView() {
	const [showResults, setShowResults] = useState(false);
	const [selectedCandidate, setSelectedCandidate] =
		useState<Candidate | null>(null);
	const [hasVoted, setHasVoted] = useState(false);
	const [timeLeft, setTimeLeft] = useState("23:45:30");

	const handleVote = (candidate: Candidate) => {
		setSelectedCandidate(candidate);
	};

	const confirmVote = async () => {
		setHasVoted(true);
		setSelectedCandidate(null);

		// Trigger confetti animation
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
	};

	return (
		<div className='min-h-screen bg-[#0F0A1F] text-white p-6'>
			<div className='max-w-4xl mx-auto space-y-8'>
				<div className='text-center space-y-4'>
					<h1 className='text-4xl font-bold'>
						Council Member Election
					</h1>
					<p className='text-gray-400'>
						Vote for the next council member to represent our DAO
					</p>
					<div className='inline-block bg-purple-900/50 px-4 py-2 rounded-lg'>
						<span className='text-purple-300'>
							Time Remaining:{" "}
						</span>
						<span className='font-mono'>{timeLeft}</span>
					</div>
				</div>

				<div className='grid md:grid-cols-3 gap-6'>
					{candidates.map((candidate) => (
						<Card
							key={candidate.id}
							className='bg-purple-900/20 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer'
							onClick={() => handleVote(candidate)}>
							<CardHeader className='text-center'>
								<div className='mx-auto w-24 h-24 rounded-full overflow-hidden mb-4'>
									<img
										src={candidate.image}
										alt={candidate.name}
										className='w-full h-full object-cover'
									/>
								</div>
								<CardTitle>{candidate.name}</CardTitle>
								<CardDescription className='text-purple-300'>
									{candidate.mandate}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button
									className='w-full bg-purple-600 hover:bg-purple-700'
									variant='secondary'>
									Vote
								</Button>
							</CardContent>
						</Card>
					))}
				</div>

				{hasVoted && (
					<div className='text-center'>
						<Button
							variant='outline'
							className='border-purple-500 text-purple-300'
							onClick={() => setShowResults(true)}>
							See Results
						</Button>
					</div>
				)}

				{showResults && (
					<Card className='bg-purple-900/20 border-purple-500/20'>
						<CardHeader>
							<CardTitle>Current Results</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer
								className='h-[300px]'
								config={chartConfig}>
								<ResponsiveContainer
									width='100%'
									height='100%'>
									<BarChart data={candidates}>
										<XAxis dataKey='name' />
										<YAxis />
										<ChartTooltip />
										<Bar
											dataKey='votes'
											fill='#8A3FFC'
										/>
									</BarChart>
								</ResponsiveContainer>
							</ChartContainer>
						</CardContent>
					</Card>
				)}

				<AlertDialog open={!!selectedCandidate}>
					<AlertDialogContent className='bg-[#1A1425] border-purple-500/20'>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Confirm Your Vote
							</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to vote for{" "}
								{selectedCandidate?.name}?
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel
								onClick={() => setSelectedCandidate(null)}
								className='bg-gray-800 hover:bg-gray-700'>
								No, cancel
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={confirmVote}
								className='bg-purple-600 hover:bg-purple-700'>
								Yes, confirm vote
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}
