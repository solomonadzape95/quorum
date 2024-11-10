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
interface Option {
	id: number;
	text: string;
	votes: number;
}

const options: Option[] = [
	{
		id: 1,
		text: "Increase development fund by 20%",
		votes: 234,
	},
	{
		id: 2,
		text: "Maintain current allocation",
		votes: 156,
	},
	{
		id: 3,
		text: "Decrease development fund by 10%",
		votes: 89,
	},
];

export default function ProposalView() {
	const [showResults, setShowResults] = useState(false);
	const [selectedOption, setSelectedOption] = useState<Option | null>(null);
	const [hasVoted, setHasVoted] = useState(false);
	const [timeLeft, setTimeLeft] = useState("47:23:15");

	const handleVote = (option: Option) => {
		setSelectedOption(option);
	};

	const confirmVote = async () => {
		setHasVoted(true);
		setSelectedOption(null);

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
						Development Fund Allocation
					</h1>
					<p className='text-gray-400'>
						Vote on the proposed changes to the development fund
						allocation
					</p>
					<div className='inline-block bg-purple-900/50 px-4 py-2 rounded-lg'>
						<span className='text-purple-300'>
							Time Remaining:{" "}
						</span>
						<span className='font-mono'>{timeLeft}</span>
					</div>
				</div>

				<div className='space-y-4'>
					{options.map((option) => (
						<Card
							key={option.id}
							className='bg-purple-900/20 border-purple-500/20 hover:border-purple-500/40 transition-all'>
							<CardContent className='flex items-center justify-between p-6'>
								<p className='text-lg'>{option.text}</p>
								<Button
									onClick={() => handleVote(option)}
									className='bg-purple-600 hover:bg-purple-700'
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
									<BarChart data={options}>
										<XAxis dataKey='text' />
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

				<AlertDialog open={!!selectedOption}>
					<AlertDialogContent className='bg-[#1A1425] border-purple-500/20'>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Confirm Your Vote
							</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to vote for:{" "}
								{selectedOption?.text}?
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel
								onClick={() => setSelectedOption(null)}
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
