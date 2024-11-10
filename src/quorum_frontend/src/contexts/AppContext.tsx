import { AuthClient } from "@dfinity/auth-client";
import {
	createContext,
	useState,
	ReactNode,
	useContext,
	useEffect,
} from "react";

interface GlobalState {
	view: "user" | "org";
	activeTeam: string;
	isAuthenticated: boolean;
	principal: string | null;
}

interface AppContextType {
	globals: GlobalState;
	updateView: (view: "user" | "org", teamId: string) => void;
	login: () => Promise<void>;
	logout: () => Promise<void>;
}

export const AppContext = createContext<AppContextType | null>(null);

export function ContextProvider({ children }: { children: ReactNode }) {
	const [authClient, setAuthClient] = useState<AuthClient | null>(null);

	// Initialize state with localStorage values and auth state
	const [globals, setGlobals] = useState<GlobalState>(() => ({
		view: (localStorage.getItem("view") as "user" | "org") || "user",
		activeTeam: localStorage.getItem("activeTeam") || "user",
		isAuthenticated: false,
		principal: null,
	}));

	useEffect(() => {
		initAuth();
	}, []);

	async function initAuth() {
		const client = await AuthClient.create();
		setAuthClient(client);

		const authenticated = await client.isAuthenticated();
		if (authenticated) {
			const principal = client.getIdentity().getPrincipal().toString();
			setGlobals((g) => ({ ...g, isAuthenticated: true, principal }));
		}
	}

	async function login() {
		if (!authClient) return;

		await authClient.login({
			identityProvider: "https://identity.ic0.app",
			onSuccess: () => {
				const principal = authClient
					.getIdentity()
					.getPrincipal()
					.toString();
				setGlobals((g) => ({ ...g, isAuthenticated: true, principal }));
			},
		});
	}

	async function logout() {
		if (!authClient) return;

		await authClient.logout();
		setGlobals((g) => ({ ...g, isAuthenticated: false, principal: null }));
		localStorage.removeItem("view");
		localStorage.removeItem("activeTeam");
	}

	function updateView(view: "user" | "org", teamId: string) {
		setGlobals((g) => ({ ...g, view, activeTeam: teamId }));
		localStorage.setItem("view", view);
		localStorage.setItem("activeTeam", teamId);
	}

	return (
		<AppContext.Provider value={{ globals, updateView, login, logout }}>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("Context cannot be used outside provider");
	}
	return context;
}
