import { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import { quorum_backend } from "../../../declarations/quorum_backend";

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

// Add this mock data near the top of the file, after the imports
const mockElection = {
	description: "Mock Election 2024",
	endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
	contestants: [
		{
			contestantId: "1",
			name: "John",
			description: "Candidate 1",
			tally: 0
		},
		{
			contestantId: "2",
			name: "Jane",
			description: "Candidate 2",
			tally: 0
		}
	]
};

export default function ElectionView() {
	const { orgid, electionId } = useParams();
	const [election, setElection] = useState<any>(null);
	const [showResults, setShowResults] = useState(false);
	const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
	const [hasVoted, setHasVoted] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [timeLeft, setTimeLeft] = useState("");

	useEffect(() => {
		fetchElectionDetails();
	}, [electionId]);

	const fetchElectionDetails = async () => {
		try {
			setIsLoading(true);
			// Comment out the actual backend call and use mock data instead
			// const electionData : any = await quorum_backend.getElec(electionId!);
			const electionData = mockElection;
			setElection(electionData);
			
			// Calculate time remaining
			const endDate = new Date(electionData.endDate);
			const now = new Date();
			const diff = endDate.getTime() - now.getTime();
			
			// Format time remaining
			const hours = Math.floor(diff / (1000 * 60 * 60));
			const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((diff % (1000 * 60)) / 1000);
			
			setTimeLeft(`${hours}:${minutes}:${seconds}`);
		} catch (error) {
			console.error("Error fetching election:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleVote = (candidate: any) => {
		setSelectedCandidate(candidate);
	};

	const confirmVote = async () => {
		try {
			if (!selectedCandidate) return;

			// Comment out the backend call and handle mock data update
			// const success = await quorum_backend.vote(electionId!, selectedCandidate.contestantId);
			const success = true; // Mock successful vote

			if (success) {
				setHasVoted(true);
				setSelectedCandidate(null);
				
				// Update the election state directly with the new vote count
				setElection((prevElection: any) => ({
					...prevElection,
					contestants: prevElection.contestants.map((contestant: any) =>
						contestant.contestantId === selectedCandidate.contestantId
							? { ...contestant, tally: contestant.tally + 1 }
							: contestant
					)
				}));

				// Trigger confetti animation
				confetti({
					particleCount: 100,
					spread: 70,
					origin: { y: 0.6 },
				});
			}
		} catch (error) {
			console.error("Error voting:", error);
		}
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin text-purple-500">Loading...</div>
			</div>
		);
	}

	if (!election) {
		return (
			<div className="text-center text-red-400 p-8">
				Election not found
			</div>
		);
	}

	// Transform contestants data for the chart
	const chartData = election.contestants.map((contestant: any) => ({
		name: contestant.name,
		votes: contestant.tally
	}));

	return (
		<div className='min-h-screen bg-[#0F0A1F] text-white p-6'>
			<div className='max-w-4xl mx-auto space-y-8'>
				<div className='text-center space-y-4'>
					<h1 className='text-4xl font-bold'>
						{election.description}
					</h1>
					<p className='text-gray-400'>
						Vote for your preferred candidate
					</p>
					<div className='inline-block bg-purple-900/50 px-4 py-2 rounded-lg'>
						<span className='text-purple-300'>
							Time Remaining:{" "}
						</span>
						<span className='font-mono'>{timeLeft}</span>
					</div>
				</div>

				<div className='grid md:grid-cols-3 gap-6'>
					{election.contestants.map((contestant: any) => (
						<Card
							key={contestant.contestantId}
							className='bg-purple-900/20 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer'
							onClick={() => handleVote(contestant)}>
							<CardHeader className='text-center'>
								<div className='mx-auto w-24 h-24 rounded-full overflow-hidden mb-4'>
									<img
										src={`https://avatar.vercel.sh/${contestant.name}.png`}
										alt={contestant.name}
										className='w-full h-full object-cover'
									/>
								</div>
								<CardTitle>{contestant.name}</CardTitle>
								<CardDescription className='text-purple-300'>
									{contestant.description}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button
									className='w-full bg-purple-600 hover:bg-purple-700'
									variant='secondary'
									disabled={hasVoted}>
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
								<ResponsiveContainer width='100%' height='100%'>
									<BarChart data={chartData}>
										<XAxis dataKey='name' />
										<YAxis />
										<ChartTooltip />
										<Bar dataKey='votes' fill='#8A3FFC' />
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
