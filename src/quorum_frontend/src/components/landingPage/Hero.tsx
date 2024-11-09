import { FaArrowRight } from "react-icons/fa";

function Hero() {
  return (
    <section className='h-screen relative flex justify-center items-center overflow-hidden bg-gradient-to-t from-[#0a0a0a] to-transparent to-80%'>
      
			<div className='absolute left-0 top-0 w-full h-screen'>
				
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

          <img src="/Images/lines.svg" alt="" className="absolute top-0 left-0 w-full md:w-[150%] h-full" />
      </div>
      
			<div className='hero--gradient h-full w-full absolute top-0 left-0' />

			<div className='z-10 text-center relative bottom-4'>
		
				<h1 className='font-grotesk text-[3.6rem]  leading-[4.7rem] text-gray-200'>
					Unifying Personal Authentication
					<br /> with Smart Verification{" "}
					<img
						src='/touchid.svg'
						alt=''
						width={1}
						height={1}
						className='inline-block w-12 h-12 invert brightness-125'
					/>
				</h1>
				<p className=' text-gray-300 mt-3 leading-6 text-[1rem]'>
					Experience seamless authentication through our unified platform,
					where verification becomes <br /> instant and your digital
					identity works everywhere you need it.
				</p>
				<div className='flex items-center justify-center gap-6 mt-10'>
					<button className='bg-[#cae88b]  px-[1.6rem] py-3  text-gray-800 text-[1.1rem] rounded-[.5rem] flex gap-1 items-center'>
						Get Started
						<span className=' rounded-full p-1 h-7 w-7 flex justify-center items-center'>
							<FaArrowRight
								color='#000'
								className='w-full'
							/>
						</span>
					</button>
					<button className='bg-[#262626] text-[#cae88b]  px-[1.6rem] py-3 text-[1.1rem] rounded-[.5rem] flex gap-3 items-center'>
						Learn more
					</button>
				</div>
			</div>
			<div className='tag-list absolute bottom-5 left-1/2 -translate-x-1/2 '>
				<h2 className='text-center font-grotesk'>Our top Features</h2>
				{/* <div className='loop-slider'>
					<div className='inner'>
						<div className='tag'>
							<span>
								<ScanFace color='#e8e8e8' />
							</span>
							Identity Verifciation
						</div>
						<div className='tag'>
							<span>
								<Fingerprint color='#e8e8e8' />
							</span>{" "}
							Biometric Authentication
						</div>
						<div className='tag'>
							<span>
								<Shield color='#e8e8e8' />
							</span>{" "}
							Privacy Controls
						</div>
						<div className='tag'>
							<span>
								<Key color='#e8e8e8' />
							</span>{" "}
							Access Management
						</div>
						<div className='tag'>
							<span>
								<Cable color='#e8e8e8' />
							</span>{" "}
							Cross-Platform Integration
						</div>

						<div className='tag'>
							<span>
								<ScanFace color='#e8e8e8' />
							</span>
							Identity Verifciation
						</div>
						<div className='tag'>
							<span>
								<Fingerprint color='#e8e8e8' />
							</span>{" "}
							Biometric Authentication
						</div>
						<div className='tag'>
							<span>
								<Shield color='#e8e8e8' />
							</span>{" "}
							Privacy Controls
						</div>
						<div className='tag'>
							<span>
								<Key color='#e8e8e8' />
							</span>{" "}
							Access Management
						</div>
						<div className='tag'>
							<span>
								<Cable color='#e8e8e8' />
							</span>{" "}
							Cross-Platform Integration
						</div>
					</div>
				</div> */}
				<div className='fade'></div>
			</div>
		</section>
    )
}

export default Hero;
