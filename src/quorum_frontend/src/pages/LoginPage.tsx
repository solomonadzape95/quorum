// import { quorum_backend } from "../../../../declarations/quorum_backend";
import { useAppContext } from "../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
	const { globals, login, authClient } = useAppContext();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		async function checkAuth() {
			if (globals.isAuthenticated) {
				// const isNewUser = await
				const from = location.state?.from?.pathname || "/onboarding";
				navigate(from, { replace: true });
			}
		}

		checkAuth();
	}, [globals.isAuthenticated, navigate, location]);

	function handleSuccess() {
		const principalId = authClient?.getIdentity().getPrincipal().toText();

		console.log(`Your PrincipalId: ${principalId}`);
	}

	const loginNFID = async () => {
		if (!authClient) throw new Error("Auth client not initialized");

		const APP_NAME = "Quorum";
		const APP_LOGO = "/Images/quorum_mobile.png";
		const CONFIG_QUERY = `?applicationName=${APP_NAME}&applicationLogo=${APP_LOGO}`;

		const identityProvider = `https://nfid.one/authenticate${CONFIG_QUERY}`;

		authClient.login({
			identityProvider,
			onSuccess: handleSuccess,
			windowOpenerFeatures: `
      left=${window.screen.width / 2 - 400 / 2},
      top=${window.screen.height / 2 - 600 / 2},
      toolbar=0,location=0,menubar=0,width=400,height=600
    `,
		});
	};

	return (
		<div className='min-h-screen bg-[#0F0B1A] bg-gradient-to-b from-[#0F0B1A] to-[#1A1527]'>
			<div className='flex w-full text-center items-center justify-center p-10 min-h-screen'>
				<div className='max-w-md w-full p-8 rounded-2xl bg-[#1A1527]/50 backdrop-blur-sm border border-purple-500/20'>
					<div className='space-y-4 mb-3'>
						<h2 className='text-2xl md:text-3xl font-bold text-white'>
							Welcome to{" "}
							<span className='bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent font-semibold'>
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
						className='w-full mb-3 bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-semibold py-3 px-4 md:py-4 md:px-6 text-sm md:text-base rounded-xl hover:from-purple-500 hover:to-fuchsia-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/25'>
						Connect with Internet Identity
					</button>

					<div className='text-center text-gray-50 text-sm'>or</div>
					<span
						className='text-purple-400 text-sm underline cursor-pointer'
						onClick={loginNFID}>
						Login with NFID
					</span>
					{globals.principal && (
						<div className='text-purple-400 text-center mt-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-sm'>
							Connected as: {globals.principal}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
