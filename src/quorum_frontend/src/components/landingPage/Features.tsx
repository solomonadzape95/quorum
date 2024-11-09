import { ReactNode } from "react";
import {
	FaChartLine,
	FaFileAlt,
	FaMoneyCheckAlt,
	FaRobot,
	FaVoteYea,
} from "react-icons/fa";

interface Feature {
	title: string;
	description: string;
	image: string;
}

const features: Feature[] = [
	{
		title: "On-chain Governance",
		description:
			"Empower your organization with decentralized decision-making, enabling transparent, member-driven voting",
		image: "/Images/features/justice.png",
	},
	{
		title: "Real-Time Analytics",
		description:
			"Track and visualize your organization's activities and finances with live analytics, giving you data-driven insights instantly.",
		image: "/Images/features/analytics.png",
	},
	{
		title: "Financial Transparency",
		description:
			"Manage and audit funds effortlessly on the blockchain, ensuring every transaction is secure, traceable, and accessible to all stakeholders.",
		image: "/Images/features/transparent.png",
	},
	{
		title: "Proposal Management",
		description:
			"Allow members to create, discuss, and vote on proposals, fostering engagement and democratic decision-making culture",
		image: "/Images/features/proposal.png",
	},
	{
		title: "Automated Smart Contracts",
		description:
			"Automate payments, agreements, and operational workflows with smart contracts that reduce manual tasks and minimize human error.",
		image: "/Images/features/contract.png",
	},
];

function Features() {
	return (
		<div className='w-full md:py-12 min-h-[70vh] py-8 relative bg-gradient-to-b from-[#0C0512] to-[#130E1C]'>
			<div className='max-w-[1240px] mx-auto px-10'>
				<h1 className='text-white text-3xl md:text-4xl font-semibold mb-8 text-center'>
					What we offer
				</h1>
				<div className='grid grid-cols-1 md:grid-cols-6 gap-8'>
					{features.map(function (feature, index) {
						return (
							<FeaturesCard
								key={index}
								index={index}
								{...feature}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Features;

function FeaturesCard({
	title,
	description,
	image,
	index,
}: {
	title: string;
	description: string;
	image: string;
	index: number;
}) {
	return (
		<div
			className={`rounded-lg  pt-0 border gradient--border overflow-hidden backdrop-blur-lg bg-gradient-to-br from-purple-900/20 to-black/10 text-white py-12 ${
				index === features.length - 1 || index === features.length - 2
					? "md:col-span-3"
					: "md:col-span-2"
			}`}>
			<div className='w-full max-h-72 mb-4 md:mb-6 overflow-hidden'>
				<img
					src={image}
					alt={title}
					className='w-full h-full object-cover'
				/>
			</div>
			<div className='p-4'>
				<h3 className='text-xl md:text-2xl font-medium '>{title}</h3>
				<p className='text-sm lg:text-lg text-gray-500 text-left'>
					{description}
				</p>
			</div>
		</div>
	);
}
