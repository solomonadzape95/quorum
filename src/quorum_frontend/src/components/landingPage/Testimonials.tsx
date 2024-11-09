import React, { useEffect, useState } from "react";

interface Testimonial {
	name: string;
	role: string;
	company: string;
	image: string;
	content: string;
}

interface TestimonialCardProps {
	testimonial: Testimonial;
}

interface ScrollingRowProps {
	testimonials: Testimonial[];
	direction?: "left" | "right";
}

const generateTestimonials = (): Testimonial[] => [
	// Tech Industry
	{
		name: "Sarah Chen",
		role: "Product Director",
		company: "TechFlow",
		image: "/api/placeholder/48/48",
		content:
			"The development team delivered exceptional results. Our platform's performance improved significantly, and user engagement has doubled since launch.",
	},
	{
		name: "James Wilson",
		role: "CTO",
		company: "InnovateLabs",
		image: "/api/placeholder/48/48",
		content:
			"Outstanding attention to detail and technical expertise. The new features transformed our user experience completely.",
	},
	{
		name: "Maya Patel",
		role: "Marketing Lead",
		company: "GrowthScale",
		image: "/api/placeholder/48/48",
		content:
			"Incredible results within tight deadlines. The team's creativity and strategic approach exceeded our expectations.",
	},
	// E-commerce Sector
	{
		name: "Alex Rivera",
		role: "Digital Commerce Head",
		company: "ShopWave",
		image: "/api/placeholder/48/48",
		content:
			"Our conversion rates increased by 150% after implementing the new checkout flow. The attention to user experience details was impressive.",
	},
	{
		name: "Emma Thompson",
		role: "E-commerce Director",
		company: "RetailTech",
		image: "/api/placeholder/48/48",
		content:
			"The integration of the new payment system was seamless. Our customers love the simplified process.",
	},
	{
		name: "Lucas Kim",
		role: "Operations Manager",
		company: "FastCart",
		image: "/api/placeholder/48/48",
		content:
			"The inventory management system revolutionized our operations. Real-time tracking has reduced errors by 85%.",
	},
	// Financial Services
	{
		name: "Diana Martinez",
		role: "FinTech Lead",
		company: "MoneyWise",
		image: "/api/placeholder/48/48",
		content:
			"The security implementations exceeded industry standards. Our clients feel more confident than ever using our platform.",
	},
	{
		name: "Robert Chen",
		role: "Investment Director",
		company: "WealthFront",
		image: "/api/placeholder/48/48",
		content:
			"The portfolio management dashboard provides incredible insights. Our analysts save hours every day.",
	},
	// Healthcare
	{
		name: "Dr. Sarah Johnson",
		role: "Medical Director",
		company: "HealthTech",
		image: "/api/placeholder/48/48",
		content:
			"The patient management system has streamlined our entire practice. Wait times reduced by 40% within weeks.",
	},
	// Education
	{
		name: "Prof. Michael Brown",
		role: "Dean of Technology",
		company: "EduTech Institute",
		image: "/api/placeholder/48/48",
		content:
			"The learning management system transformed our remote education capabilities. Student engagement increased dramatically.",
	},
	// Startup Founders
	{
		name: "Rachel Foster",
		role: "Founder & CEO",
		company: "InnoStart",
		image: "/api/placeholder/48/48",
		content:
			"From concept to launch in record time. The team's agility and expertise helped us secure our first round of funding.",
	},
	{
		name: "David Kumar",
		role: "Tech Founder",
		company: "DevLaunch",
		image: "/api/placeholder/48/48",
		content:
			"The MVP exceeded our expectations. We gained our first 1000 users within the first month of launch.",
	},
	// Agency Clients
	{
		name: "Sophie Anderson",
		role: "Creative Director",
		company: "DesignFlow",
		image: "/api/placeholder/48/48",
		content:
			"The redesign captured our brand essence perfectly. Our client satisfaction scores have never been higher.",
	},
	{
		name: "Tom Mitchell",
		role: "Marketing Head",
		company: "BrandBox",
		image: "/api/placeholder/48/48",
		content:
			"The analytics dashboard provides invaluable insights. We've optimized our campaigns and doubled our ROI.",
	},
	// Enterprise Clients
	{
		name: "Patricia Wong",
		role: "Enterprise Solutions Director",
		company: "GlobalTech",
		image: "/api/placeholder/48/48",
		content:
			"The enterprise solution scaled beautifully. We now process 10x the transactions with zero downtime.",
	},
	{
		name: "Mark Stevens",
		role: "Innovation Lead",
		company: "FutureCore",
		image: "/api/placeholder/48/48",
		content:
			"The AI implementation has automated 70% of our routine tasks. Our team can now focus on strategic initiatives.",
	},
	// Non-Profit Sector
	{
		name: "Elena Rodriguez",
		role: "Executive Director",
		company: "GreenEarth",
		image: "/api/placeholder/48/48",
		content:
			"The donation platform increased our monthly contributions by 200%. The impact on our cause has been tremendous.",
	},
	{
		name: "Chris Taylor",
		role: "Operations Director",
		company: "HelpingHands",
		image: "/api/placeholder/48/48",
		content:
			"The volunteer management system has transformed our organization. We can now coordinate efforts across multiple locations efficiently.",
	},
];

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => (
	<div className='flex flex-col gap-4 bg-gray-900 p-6 rounded-lg w-80 mx-4 shadow-lg'>
		<div className='flex items-center gap-4'>
			<img
				src={testimonial.image}
				alt={testimonial.name}
				className='w-12 h-12 rounded-full'
			/>
			<div>
				<h3 className='text-white font-semibold'>{testimonial.name}</h3>
				<p className='text-gray-400 text-sm'>{testimonial.role}</p>
				<p className='text-gray-400 text-xs'>{testimonial.company}</p>
			</div>
		</div>
		<p className='text-gray-300 text-sm'>{testimonial.content}</p>
	</div>
);

const ScrollingRow: React.FC<ScrollingRowProps> = ({
	testimonials,
	direction = "left",
}) => {
	const [position, setPosition] = useState<number>(0);
	const testimonialWidth = 320; // Adjust based on your card's width

	useEffect(() => {
		const animate = () => {
			setPosition((prev) => {
				const newPosition = direction === "left" ? prev - 1 : prev + 1; // Increased speed

				if (
					Math.abs(newPosition) >=
					testimonialWidth * testimonials.length
				) {
					return 0;
				}
				return newPosition;
			});
		};

		const intervalId = setInterval(animate, 16); // Adjusted interval for smoother animation
		return () => clearInterval(intervalId);
	}, [direction, testimonials.length]);

	return (
		<div className='overflow-hidden whitespace-nowrap'>
			<div
				className='inline-flex transition-transform duration-1000'
				style={{ transform: `translateX(${position}px)` }}>
				{[...testimonials, ...testimonials].map(
					(testimonial, index) => (
						<TestimonialCard
							key={index}
							testimonial={testimonial}
						/>
					)
				)}
			</div>
		</div>
	);
};

const InfiniteTestimonials: React.FC = () => {
	const allTestimonials = generateTestimonials();
	const rowSize = Math.ceil(allTestimonials.length / 3);

	const rows = [
		allTestimonials.slice(0, rowSize),
		allTestimonials.slice(rowSize, rowSize * 2),
		allTestimonials.slice(rowSize * 2),
	];

	return (
		<div className='flex flex-col gap-8 p-8'>
			{rows.map((rowTestimonials, index) => (
				<ScrollingRow
					key={index}
					testimonials={rowTestimonials}
					direction={index % 2 === 0 ? "left" : "right"}
				/>
			))}
		</div>
	);
};

function Testimonials() {
	return (
		<div className='w-full h-screen bg-gradient-to-b from-black to-black/20 backdrop-blur-sm'>
			<div className='w-full max-w-[1200px] mx-auto'>
				<h1 className='text-white text-4xl font-bold'>
					What our customers have to say about us.
				</h1>

				<div>
					<InfiniteTestimonials />
				</div>
			</div>
		</div>
	);
}

export default Testimonials;
