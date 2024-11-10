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

export default function ProfileCreationForm() {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState<{
		displayName: string;
		username: string;
		profilePicture: File | null;
	}>({
		displayName: "",
		username: "",
		profilePicture: null,
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

	// Enable dark mode
	useEffect(() => {
		document.documentElement.classList.add("dark");
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

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type.startsWith("image/")) {
			setFormData((prev) => ({ ...prev, profilePicture: file }));
			setPreviewUrl(URL.createObjectURL(file) as string);
			setErrors((prev) => ({ ...prev, profilePicture: null }));
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

	const handleSubmit = (
		e:
			| React.FormEvent<HTMLFormElement>
			| React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		// Here you would typically send the form data to your backend
		console.log("Form submitted:", formData);
		// For demonstration, we'll just show an alert
		alert("Profile created successfully!");
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
									Profile Picture
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
