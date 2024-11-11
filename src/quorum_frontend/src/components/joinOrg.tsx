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

interface JoinOrgModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function JoinOrgModal({ isOpen, onClose }: JoinOrgModalProps) {
	const [inviteLink, setInviteLink] = useState("");
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [orgName, setOrgName] = useState("");

	const handleJoin = async () => {
		setStatus("loading");

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		if (inviteLink.includes("valid")) {
			setStatus("success");
			setOrgName("Quorum DAO");
		} else {
			setStatus("error");
		}
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}>
			<DialogContent className='bg-[#1A1425] border-purple-500/20 sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Join Organization</DialogTitle>
					<DialogDescription>
						Enter your invite link to join an organization
					</DialogDescription>
				</DialogHeader>

				{status === "success" ? (
					<div className='space-y-6 py-6'>
						<div className='flex flex-col items-center text-center space-y-4'>
							<div className='h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center'>
								<CheckCircle2 className='h-6 w-6 text-purple-500' />
							</div>
							<div className='space-y-2'>
								<h3 className='font-semibold text-xl'>
									Welcome to {orgName}!
								</h3>
								<p className='text-gray-400'>
									You've successfully joined the organization
								</p>
							</div>
						</div>
						<Button
							className='w-full bg-purple-600 hover:bg-purple-700'
							onClick={onClose}>
							Get Started
						</Button>
					</div>
				) : (
					<div className='space-y-6 py-6'>
						<div className='space-y-2'>
							<Input
								placeholder='Paste your organization invite link here'
								value={inviteLink}
								onChange={(e) => setInviteLink(e.target.value)}
								className='bg-purple-900/20 border-purple-500/20 focus:border-purple-500'
							/>
							{status === "error" && (
								<p className='text-red-400 text-sm flex items-center gap-2'>
									<X className='h-4 w-4' />
									Invalid or expired invite link. Please try
									again.
								</p>
							)}
						</div>

						<Button
							className='w-full bg-purple-600 hover:bg-purple-700'
							onClick={handleJoin}
							disabled={!inviteLink || status === "loading"}>
							{status === "loading"
								? "Joining..."
								: "Join Organization"}
						</Button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
