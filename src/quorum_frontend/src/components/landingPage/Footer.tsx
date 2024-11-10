import { Link } from "react-router-dom";
import { FaMailBulk, FaPhone, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
	return (
		<footer className='w-full bg-[#0D0A17]'>
			<div className='w-full max-w-lg mx-auto py-8 border-b border-gray-400'>
				<div className='flex items-center gap-2 justify-center mb-4'>
					<span className='rounded-full w-4 h-4 bg-gradient-to-br from-[#681ee0] to-[#6C49C4] animate-pulse' />
					<p className='text-gray-300 text-center'>Newsletter</p>
				</div>
				<form className='flex flex-col gap-4 w-full relative'>
					<input
						type='email'
						placeholder='Email'
						className='bg-transparent border border-gray-400 text-gray-300 px-4 py-4 rounded-full text-base'
					/>
					<button
						type='submit'
						className='bg-gradient-to-br from-[#681ee0] to-[#6C49C4] text-white px-4 text-base py-2 rounded-full absolute right-[6px] top-1/2 transform -translate-y-1/2'>
						Subscribe
					</button>
				</form>
			</div>

			<BottomFooter />
		</footer>
	);
}

const BottomFooter = () => {
	const navigationLinks = {
		"Our Core Thing": [
			"Key Solution",
			"Why Quorum",
			"Process",
			"Terms & Condition",
		],
		Advantages: ["Testimonial", "Whitepaper"],
	};

	return (
		<footer className='bg-navy-900 text-gray-300 py-8 px-4 md:px-8'>
			<div className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8'>
					{/* Logo and Contact Section */}
					<div className='lg:col-span-4'>
						<div className='mb-6'>
							<img
								src='/quorum_logo.png'
								alt='Quorum Logo'
								className='w-1/2 invert brightness-200'
							/>
						</div>

						<div className='space-y-4'>
							<div className='flex items-center space-x-3'>
								<FaMailBulk
									className='text-[#9C96E3]'
									size={20}
								/>
								<span>info@quorum.com</span>
							</div>
							<div className='flex items-center space-x-3'>
								<FaPhone
									className='text-[#9C96E3]'
									size={20}
								/>
								<span>+123 456 7890</span>
							</div>
						</div>

						{/* Social Media Links */}
						<div className='flex space-x-4 mt-6'>
							<a
								href='#'
								className='p-2 bg-navy-800 rounded-full hover:bg-[#9C96E3] transition-colors'>
								<FaTwitter size={18} />
							</a>
							<a
								href='#'
								className='p-2 bg-navy-800 rounded-full hover:bg-[#9C96E3] transition-colors'>
								<FaLinkedin size={18} />
							</a>
						</div>
					</div>

					{/* Navigation Links */}
					{Object.entries(navigationLinks).map(
						([category, links]) => (
							<div
								key={category}
								className='lg:col-span-4'>
								<h3 className='text-lg font-semibold mb-4 text-white'>
									{category}
								</h3>
								<ul className='space-y-3'>
									{links.map((link) => (
										<li key={link}>
											<a
												href='#'
												className='hover:text-[#9C96E3] transition-colors'>
												{link}
											</a>
										</li>
									))}
								</ul>
							</div>
						)
					)}
				</div>

				<div className='mt-12 pt-8 border-t border-gray-300'>
					<div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
						<div className='text-sm'>
							Created by Wagmi Wereys | Powered by the ICP Network
						</div>
						<div className='text-sm'>
							© {new Date().getFullYear()} Quorum. All Rights
							Reserved
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
