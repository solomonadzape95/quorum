// import { useEffect } from 'react';
// import { useState } from 'react';
// import { userService } from '../services/dbService';
// import { AuthClient } from '@dfinity/auth-client';
// import { Identity } from '@dfinity/agent';
// import { Principal } from '@dfinity/principal';

// // ... existing imports ...

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [authClient, setAuthClient] = useState<AuthClient | null>(null);
//   const [identity, setIdentity] = useState<Identity | null>(null);
//   const [principal, setPrincipal] = useState<Principal | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     initAuth();
//   }, []);

//   const initAuth = async () => {
//     try {
//       const client = await AuthClient.create();
//       setAuthClient(client);

//       if (await client.isAuthenticated()) {
//         const identity = client.getIdentity();
//         const principal = identity.getPrincipal();
//         setIdentity(identity as any);
//         setPrincipal(principal as any);
//         setIsAuthenticated(true);

//         // Check and create user if needed
//         await userService.checkAndCreateUser(principal.toString());
//       }
//     } catch (error) {
//       console.error("Auth initialization error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const login = async () => {
//     if (!authClient) return;

//     try {
//       await new Promise((resolve, reject) => {
//         authClient.login({
//           identityProvider: process.env.DFX_NETWORK === "ic" 
//             ? "https://identity.ic0.app/#authorize" 
//             : `http://localhost:4943?canisterId=${process.env.INTERNET_IDENTITY_CANISTER_ID}`,
//           onSuccess: resolve,
//           onError: reject,
//         });
//       });

//       const identity = authClient.getIdentity();
//       const principal = identity.getPrincipal();

//       setIdentity(identity as any);
//       setPrincipal(principal as any);
//       setIsAuthenticated(true);

//       // Check and create user after successful login
//       await userService.checkAndCreateUser(principal.toString());
//     } catch (error) {
//       console.error("Login error:", error);
//       throw error;
//     }
//   };

//   // ... rest of your auth context code ...
// } 