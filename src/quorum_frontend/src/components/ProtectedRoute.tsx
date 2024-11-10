import { useAppContext } from "../contexts/AppContext";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { globals } = useAppContext();
	const location = useLocation();

	if (!globals.isAuthenticated) {
		return (
			<Navigate
				to='/login'
				state={{ from: location }}
				replace
			/>
		);
	}

	return <>{children}</>;
}

export default ProtectedRoute;
