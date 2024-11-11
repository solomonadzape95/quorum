import { useAppContext } from "../contexts/AppContext";
import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { globals, authClient } = useAppContext();
	const location = useLocation();
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthed, setIsAuthed] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			// Wait for authClient to be ready
			if (authClient) {
				const isAuthenticated = await authClient.isAuthenticated();
				setIsAuthed(isAuthenticated);
			}
			setIsLoading(false);
		};

		checkAuth();
	}, [authClient, globals.isAuthenticated]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500" />
			</div>
		);
	}

	if (!isAuthed) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <>{children}</>;
}

export default ProtectedRoute;
