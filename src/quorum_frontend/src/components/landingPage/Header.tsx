
function Header() {
	return (
		<header className='py-3 px-5 fixed  left-1/2 -translate-x-1/2 top-10 w-[50%] flex justify-between items-center z-30 backdrop-blur-xl border border-[#37383baf] bg-transparent shadow-xl rounded-full'>
			<div className='flex items-center gap-2'>
				<img
					src='/quorum_logo.png'
					alt=''
					className='w-32 invert'
					width={50}
					height={50}
				/>
      </div>
      
			<button className='text-sm  bg-[#cae88b] px-6 py-[.6rem] text-gray-900 font-semibold rounded-[.7rem]'>
				Connect Wallet
			</button>
		</header>
	);
}
export default Header;
