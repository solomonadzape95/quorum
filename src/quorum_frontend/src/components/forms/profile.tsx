import { quorum_backend } from "../../../../declarations/quorum_backend";

import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight, Upload, Info } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";

// Add this helper function to convert File to base64 string
const fileToDataUrl = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			resolve(reader.result as string);
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
};

// Add a constant for max file size (2MB in bytes)
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

export default function ProfileCreationForm() {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState<{
		displayName: string;
		username: string;
		profilePicture: File | null;
			principalId: string;
	}>({
		displayName: "",
		username: "",
		profilePicture: null,
        principalId: "",
	});
	const [errors, setErrors] = useState<{
		displayName?: string | null;
		username?: string | null;
		profilePicture?: string | null;
	}>({
		displayName: null,
		username: null,
	});
	const [previewUrl, setPreviewUrl] = useState(String);

    const {authClient} = useAppContext();
    const navigate = useNavigate();


	useEffect(() => {
		const principalId = authClient?.getIdentity().getPrincipal().toText();

        if (principalId) {
            setFormData((prev) => ({ ...prev, principalId: principalId }));
        }
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		validateField(name, value);
	};

	const validateField = (name: string, value: string) => {
		let newErrors = { ...errors };
		switch (name) {
			case "displayName":
				if (!value.trim())
					newErrors.displayName = "Display name is required";
				else delete newErrors.displayName;
				break;
			case "username":
				if (!value.trim()) newErrors.username = "Username is required";
				else if (!/^[a-zA-Z0-9-_]+$/.test(value))
					newErrors.username =
						"Username must only letters, numbers, underscores and dashes with no spaces";
				else delete newErrors.username;
				break;
			default:
				break;
		}
		setErrors(newErrors);
	};

	// Update handleFileChange to store the data URL
	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		
		if (!file) return;

		// Check file size first
		if (file.size > MAX_FILE_SIZE) {
			setErrors((prev) => ({
				...prev,
				profilePicture: "File size must be less than 2MB",
			}));
			return;
		}

		if (file.type.startsWith("image/")) {
			try {
				const dataUrl = await fileToDataUrl(file);
				setFormData((prev) => ({ ...prev, profilePicture: file }));
				setPreviewUrl(dataUrl);
				setErrors((prev) => ({ ...prev, profilePicture: null }));
			} catch (error) {
				setErrors((prev) => ({
					...prev,
					profilePicture: "Error processing image file",
				}));
			}
		} else {
			setErrors((prev) => ({
				...prev,
				profilePicture: "Please upload a valid image file",
			}));
		}
	};

	const handleNext = () => {
		if (step < 3) setStep((prev) => prev + 1);
	};

	const handlePrevious = () => {
		if (step > 1) setStep((prev) => prev - 1);
	};

	// Update handleSubmit to use the data URL
	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();

        if(step < 3) {
            setStep(prev=>prev + 1)
            return;
        }
        
        const newUser = {
            username: formData.username,
            displayName: formData.displayName,
            pfp: previewUrl,
            principalId: formData.principalId,
            organizations: [],
            elections: [],
        }

        const res = await quorum_backend.addUser(newUser.username, newUser.displayName, newUser.pfp, newUser.principalId, newUser.organizations, newUser.elections);

        if (res) {
            navigate("/dashboard")
        } else {
            alert("Failed to create profile");
        }
	};

	const isStepValid = () => {
		switch (step) {
			case 1:
				return (
					formData.displayName &&
					formData.username &&
					!errors.displayName &&
					!errors.username
				);
			case 2:
				return formData.profilePicture && !errors.profilePicture;
			case 3:
				return true; // Review step is always valid if we've made it this far
			default:
				return false;
		}
	};

	return (
		<div className='min-h-screen bg-[#0F0B15] bg-grid-small-white/[0.2] relative flex items-center justify-center p-4'>
			<div className='absolute inset-0 bg-[#0F0B15]/80 pointer-events-none' />
			<Card className='w-full max-w-md bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10 relative z-10'>
				<CardHeader>
					<CardTitle className='text-2xl text-center bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent'>
						Create Your Profile
					</CardTitle>
					<CardDescription className='text-center text-purple-300'>
						Step {step} of 3
					</CardDescription>
					<Progress
						value={step * 33.33}
						className='w-full h-2 bg-purple-500/20'
					/>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleSubmit}
						className='space-y-6'>
						{step === 1 && (
							<div className='space-y-4'>
								<div>
									<Label
										htmlFor='displayName'
										className='text-purple-100'>
										Display Name
									</Label>
									<Input
										id='displayName'
										name='displayName'
										value={formData.displayName}
										onChange={handleInputChange}
										className='bg-purple-500/10 border-purple-500/20 text-purple-100 placeholder-purple-300'
										placeholder='Enter your display name'
									/>
									{errors.displayName && (
										<p className='text-red-400 text-sm mt-1'>
											{errors.displayName}
										</p>
									)}
								</div>
								<div>
									<Label
										htmlFor='username'
										className='text-purple-100'>
										Username
									</Label>
									<div className='flex items-center'>
										<Input
											id='username'
											name='username'
											value={formData.username}
											onChange={handleInputChange}
											className='bg-purple-500/10 border-purple-500/20 text-purple-100 placeholder-purple-300'
											placeholder='Enter your username'
										/>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger>
													<Info className='h-4 w-4 text-purple-400 ml-2' />
												</TooltipTrigger>
												<TooltipContent className='bg-purple-900 text-purple-100'>
													<p>
														Username must be
														alphanumeric with no
														spaces
													</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
									{errors.username && (
										<p className='text-red-400 text-sm mt-1'>
											{errors.username}
										</p>
									)}
								</div>
							</div>
						)}
						{step === 2 && (
							<div className='space-y-4'>
								<Label
									htmlFor='profilePicture'
									className='text-purple-100'>
									Profile Picture <span className="text-sm text-purple-300">(Max 2MB)</span>
								</Label>
								<div className='flex flex-col items-center space-y-4'>
									<Avatar className='w-32 h-32'>
										<AvatarImage src={previewUrl} />
										<AvatarFallback className='bg-purple-500 text-white text-4xl'>
											{formData.displayName
												? formData.displayName[0].toUpperCase()
												: "?"}
										</AvatarFallback>
									</Avatar>
									<Button
										type='button'
										onClick={() => {
											const profilePictureElement =
												document.getElementById(
													"profilePicture"
												);
											if (profilePictureElement) {
												profilePictureElement.click();
											}
										}}
										className='bg-purple-500 hover:bg-purple-600 text-white'>
										<Upload className='mr-2 h-4 w-4' />{" "}
										Upload Image
									</Button>
									<Input
										id='profilePicture'
										name='profilePicture'
										type='file'
										accept='image/*'
										onChange={handleFileChange}
										className='hidden'
										data-max-size={MAX_FILE_SIZE}
									/>
									{formData.profilePicture && (
										<p className='text-purple-300'>
											{formData.profilePicture.name}
										</p>
									)}
								</div>
								{errors.profilePicture && (
									<p className='text-red-400 text-sm mt-1'>
										{errors.profilePicture}
									</p>
								)}
							</div>
						)}
						{step === 3 && (
							<div className='space-y-4'>
								<h3 className='text-lg font-semibold text-purple-100'>
									Review Profile Details
								</h3>
								<div className='flex items-center space-x-4'>
									<Avatar className='w-16 h-16'>
										<AvatarImage src={previewUrl} />
										<AvatarFallback className='bg-purple-500 text-white text-2xl'>
											{formData.displayName
												? formData.displayName[0].toUpperCase()
												: "?"}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className='text-purple-300'>
											Display Name:{" "}
											<span className='text-purple-100'>
												{formData.displayName}
											</span>
										</p>
										<p className='text-purple-300'>
											Username:{" "}
											<span className='text-purple-100'>
												@{formData.username}
											</span>
										</p>
									</div>
								</div>
							</div>
						)}
					</form>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button
						type='button'
						onClick={handlePrevious}
						disabled={step === 1}
						className='bg-purple-500 hover:bg-purple-600 text-white'>
						<ChevronLeft className='mr-2 h-4 w-4' /> Previous
					</Button>
					{step < 3 ? (
						<Button
							type='button'
							onClick={handleNext}
							disabled={!isStepValid()}
							className='bg-purple-500 hover:bg-purple-600 text-white'>
							Next <ChevronRight className='ml-2 h-4 w-4' />
						</Button>
					) : (
						<Button
							type='button'
							onClick={handleSubmit}
							disabled={!isStepValid()}
							className='bg-purple-500 hover:bg-purple-600 text-white'>
							Create Profile
						</Button>
					)}
				</CardFooter>
			</Card>
		</div>
	);
}
