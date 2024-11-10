import React from "react";
import { Link } from "react-router-dom";

interface TeamMember {
	name: string;
	role: string;
	twitterHandle: string;
	image: string;
}

interface TeamMemberCardProps extends TeamMember {}

const teamMembers: TeamMember[] = [
	{
		name: "devtochukwu",
		role: "Frontend Developer",
		twitterHandle: "devtochukwu",
		image: "/Images/team/devtochukwu.jpg",
	},
	{
		name: "Solomon",
		role: "Lead Developer",
		twitterHandle: "_chiater99",
		image: "/Images/team/solomon.png",
	},
	{
		name: "Godswill",
		role: "Backend Developer",
		twitterHandle: "goodies_art",
		image: "/Images/team/godswill.png",
	},
	{
		name: "Kaycee",
		role: "Smart Contract Developer",
		twitterHandle: "",
		image: "/Images/team/kaycee.png",
	},
	{
		name: "Kamsi Y. Ochi",
		role: "Product Designer",
		twitterHandle: "kamsiyochi51241",
		image: "/Images/team/stephanie.png",
	},
];

function TeamMemberCard({
	name,
	role,
	twitterHandle,
	image,
}: TeamMemberCardProps) {
	return (
		<div className='gradient--border rounded-lg shadow-lg text-white w-full max-h-[400px] overflow-hidden relative'>
			<div className='w-full min-h-full'>
				<img
					src={image}
					alt={name}
					className='w-full h-full object-cover'
				/>
			</div>
			<div className='bg-gradient-to-tr from-[#130E1C80] to-[#681EE060] backdrop-blur-md absolute bottom-0 left-0 w-full h-18 p-2 pl-4'>
				<h3 className='text-xl font-semibold'>{name}</h3>
				<p className='text-gray-400 text-base mb-0'>{role}</p>
				<Link
					to={`https://twitter.com/${twitterHandle}`}
					target='_blank'
					rel='noopener noreferrer'
					className='text-blue-400 -mt-4 hover:underline text-base'>
					@{twitterHandle}
				</Link>
			</div>
		</div>
	);
}

function Teams() {
	return (
		<div className='w-full py-12 bg-gradient-to-b from-[#130E1C] to-[#681EE050]'>
			<div className='max-w-[1200px] mx-auto'>
				<h1 className='text-white text-3xl md:text-4xl font-semibold mb-8 text-center'>
					Our Team
				</h1>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap w-full max-w-[1200px] mx-auto gap-8 px-4'>
					{teamMembers.map((member: TeamMember) => (
						<TeamMemberCard
							key={member.twitterHandle}
							name={member.name}
							role={member.role}
							twitterHandle={member.twitterHandle}
							image={member.image}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Teams;
