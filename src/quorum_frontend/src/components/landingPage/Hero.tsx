import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Hero() {
	const navigate = useNavigate();

	return (
		<section className='h-screen relative flex justify-center items-center overflow-hidden bg-gradient-to-t from-[#0C0512] to-transparent to-80%'>
			<div className='fixed -z-10 left-0 top-0 w-full h-screen'>
				{/* <img
					src='https://framerusercontent.com/images/DSdxX3sp4OSZomF491zszwZzh9g.svg'
					alt=''
					width={1}
					height={1}
					className='absolute top-0 left-0 w-full brightness-125 h-[17rem]'
				/>
				<img
					src='https://framerusercontent.com/images/fX4qDtjEx58RDMEQ2paoAsRYtqI.svg'
					alt=''
					width={1000}
					height={1000}
					className='absolute bottom-0 left-0 w-full '
				/> */}

				<div className='rounded-tr-full rounded-bl-full rounded-tl-full rounded-br-4xl rotate-90 left-36 w-[250px] h-[250px] bg-purple-500 blur-xl absolute top-24 opacity-10' />
				<div className='rounded-tr-full rounded-bl-full rounded-tl-full rounded-br-4xl right-36 w-[250px] h-[250px] bg-red-500 blur-xl absolute top-96 opacity-10' />

				<img
					src='/Images/lines.svg'
					alt=''
					className='absolute top-0 left-0 w-full md:w-[150%] h-full'
				/>
			</div>

			<div className='z-10 text-center relative bottom-4 px-4 md:px-0'>
				<h1 className='md:text-7xl text-5xl lg:text-[5rem] font-bold lg:leading-[6rem] md:mb-10 text-gray-200'>
					On-chain solutions
					<br /> for{" "}
					<span className='hero--span'>smarter organizations</span>
				</h1>
				<p className=' text-gray-300 mt-3 md:leading-6 text-sm md:text-2xl'>
					Empower your organization with the next level of
					transparency, <br className='hidden md:block' />
					decision-making, and control-all on the blockchain.
				</p>
				<div className='flex items-center justify-center gap-6 mt-10'>
					<button
						onClick={() => navigate("/login", { replace: true })}
						className='bg-gradient-to-r from-[#6C49C4] to-[#681ee0] px-3 md:px-6 py-1 md:py-3 text-blue-50 md:font-semibold text-sm md:text-xl rounded-full flex gap-1 items-center'>
						Get Started
						<span className=' rounded-full p-1 h-7 w-7 flex justify-center items-center'>
							<FaArrowRight
								color='#fff'
								className='w-full'
							/>
						</span>
					</button>
				</div>
			</div>
		</section>
	);
}

export default Hero;
