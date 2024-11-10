import { useAppContext } from "../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
	const { globals, login } = useAppContext();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (globals.isAuthenticated) {
			const from =
				location.state?.from?.pathname || "/dashboard/overview";
			navigate(from, { replace: true });
		}
	}, [globals.isAuthenticated, navigate, location]);

	return (
		<div className='min-h-screen bg-[#0F0B1A] bg-gradient-to-b from-[#0F0B1A] to-[#1A1527]'>
			<div className='flex w-full text-center items-center justify-center p-10 min-h-screen'>
				<div className='max-w-md w-full space-y-8 p-8 rounded-2xl bg-[#1A1527]/50 backdrop-blur-sm border border-purple-500/20'>
					<div className='space-y-4'>
						<h2 className='text-3xl font-bold text-white'>
							Welcome to{" "}
							<span className='bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent'>
								Quorum
							</span>
						</h2>
						<p className='text-gray-400 text-base'>
							Connect with Internet Identity to access your
							account
						</p>
					</div>

					<button
						onClick={login}
						className='w-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-semibold py-4 px-6 text-base rounded-xl hover:from-purple-500 hover:to-fuchsia-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/25'>
						Connect with Internet Identity
					</button>

					{globals.principal && (
						<div className='text-purple-400 text-center mt-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20'>
							Connected as: {globals.principal}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
