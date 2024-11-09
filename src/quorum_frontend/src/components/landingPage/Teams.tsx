import React from "react";

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
		name: "Stephanie",
		role: "Product Designer",
		twitterHandle: "",
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
		<div className='bg-gradient-to-r from-[#6C49C4] to-[#681ee0] gradient--border rounded-lg shadow-lg text-white w-80 mx-4'>
			<div className='w-full max-h-60'>
				<img
					src={image}
					alt={name}
					className='w-full h-full object-cover'
				/>
			</div>
			<h3 className='text-xl font-semibold'>{name}</h3>
			<p className='text-gray-400'>{role}</p>
			<a
				href={`https://twitter.com/${twitterHandle}`}
				target='_blank'
				rel='noopener noreferrer'
				className='text-blue-400 hover:underline'>
				@{twitterHandle}
			</a>
		</div>
	);
}

function Teams() {
	return (
		<div className='w-full py-12 bg-gradient-to-b from-[#130E1C] to-[#681EE050]'>
			<div className='max-w-[1200px] mx-auto px-10'>
				<h1 className='text-white text-3xl md:text-4xl font-semibold mb-8 text-center'>
					Our Team
				</h1>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
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
