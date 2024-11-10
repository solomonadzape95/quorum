import { replace, useNavigate } from "react-router-dom";

function Header() {
	const navigate = useNavigate();
	return (
		<header className='py-3 px-5 fixed left-1/2 -translate-x-1/2 top-10 w-[90%] max-w-6xl flex justify-between items-center z-30 backdrop-blur-xl border border-[#37383baf] bg-transparent shadow-xl rounded-full'>
			<div className='flex items-center gap-2'>
				<img
					src='/quorum_logo.png'
					alt=''
					className='w-32 invert'
					width={50}
					height={50}
				/>
			</div>

			<button
				onClick={() => navigate("/login", { replace: true })}
				className='bg-gradient-to-r from-[#6C49C4] to-[#681ee0] px-3 md:px-6 py-1 md:py-3 text-blue-50 md:font-semibold text-sm md:text-xl rounded-full'>
				Get Started
			</button>
		</header>
	);
}
export default Header;
