import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { quorum_backend } from "../../../declarations/quorum_backend";
import { useAppContext } from "@/contexts/AppContext";

interface JoinOrgModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function JoinOrgModal({ isOpen, onClose }: JoinOrgModalProps) {
	const [inviteLink, setInviteLink] = useState("");
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
	const [errorMessage, setErrorMessage] = useState("");
	const { globals } = useAppContext();

	const extractOrgName = (link: string): string | null => {
		try {
			// Check if link follows the pattern join.org.OrgName
			if (!link.startsWith("join.org.")) {
				throw new Error("Invalid link format");
			}

			// Extract org name and replace ++ with spaces
			const orgName = link.slice(9).replace(/\+\+/g, " ");
			return orgName;
		} catch (error) {
			return null;
		}
	};

	const handleJoin = async () => {
		try {
			setStatus("loading");
			setErrorMessage("");

			const orgName = extractOrgName(inviteLink);
			if (!orgName) {
				throw new Error("Invalid organization link format");
			}

			if (!globals.principal) {
				throw new Error("User not authenticated");
			}

			// First check if the organization exists
			const org = await quorum_backend.getOrgan(orgName);
			if (!org) {
				throw new Error("Organization not found");
			}

			// Join the organization
			const joinSuccess = await quorum_backend.joinOrgan(globals.principal, orgName);
			if (!joinSuccess) {
				throw new Error("Failed to join organization");
			}

			// Add member to organization's member list
			const addMemberSuccess = await quorum_backend.addMember(orgName, globals.principal);
			if (!addMemberSuccess) {
				throw new Error("Failed to add member to organization");
			}
            console.log("Joined organization successfully");
			setStatus("success");
			setTimeout(() => {
				onClose();
				setStatus("idle");
				setInviteLink("");
			}, 1500);

		} catch (error) {
			console.error("Join organization error:", error);
			setStatus("error");
			setErrorMessage(error instanceof Error ? error.message : "Failed to join organization");
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-[#0F0B15] text-purple-100 border-purple-500/20">
				<DialogHeader>
					<DialogTitle>Join Organization</DialogTitle>
					<DialogDescription className="text-purple-300">
						Enter the organization's invite link to join.
					</DialogDescription>
				</DialogHeader>

				{status === "success" ? (
					<div className="flex flex-col items-center justify-center py-4">
						<CheckCircle2 className="w-12 h-12 text-green-500 mb-2" />
						<p className="text-green-500">Successfully joined organization!</p>
					</div>
				) : (
					<div className="space-y-4">
						<div className="space-y-2">
							<Input
								placeholder="join.org.Organization++Name"
								value={inviteLink}
								onChange={(e) => setInviteLink(e.target.value)}
								className="bg-black/40 border-purple-500/20 text-purple-100"
							/>
							{status === "error" && (
								<p className="text-red-500 text-sm">{errorMessage}</p>
							)}
						</div>
						<Button
							className="w-full bg-purple-600 hover:bg-purple-700"
							onClick={handleJoin}
							disabled={!inviteLink || status === "loading"}
						>
							{status === "loading" ? "Joining..." : "Join Organization"}
						</Button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
