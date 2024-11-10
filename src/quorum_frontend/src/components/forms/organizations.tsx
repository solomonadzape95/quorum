"use client";

import React, { useState, useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Upload, Info, X } from "lucide-react";
interface FormErrs {
  name?: string;
  handle?: string;
  profilePicture?: string;
  privacy?: "public";
  admins?: string;
}
export default function OrganizationCreationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    handle: "",
    profilePicture: null as File | null,
    privacy: "public",
    admins: "",
  });
  const [errors, setErrors] = useState<FormErrs>({});
  const [validAdmins, setValidAdmins] = useState<string[] | []>([]);
  const [invalidAdmins, setInvalidAdmins] = useState<string[] | []>([]);

  // Enable dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let newErrors = { ...errors };
    switch (name) {
      case "name":
        if (!value.trim()) newErrors.name = "Organization name is required";
        else delete newErrors.name;
        break;
      case "handle":
        if (!value.trim()) newErrors.handle = "Handle is required";
        else if (!/^[a-zA-Z0-9]+$/.test(value))
          newErrors.handle = "Handle must be alphanumeric with no spaces";
        else delete newErrors.handle;
        break;
      case "admins":
        const adminList = value.split(",").map((admin) => admin.trim());
        const validAdmins = adminList.filter((admin) =>
          /^[a-zA-Z0-9]+$/.test(admin)
        );
        const invalidAdmins = adminList.filter(
          (admin) => !/^[a-zA-Z0-9]+$/.test(admin) && admin !== ""
        );
        setValidAdmins(validAdmins);
        setInvalidAdmins(invalidAdmins);
        if (invalidAdmins.length > 0)
          newErrors.admins = "Some usernames are invalid";
        else delete newErrors.admins;
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, profilePicture: file }));
        delete errors.profilePicture;
      } else {
        setErrors((prev) => ({
          ...prev,
          profilePicture: "Please upload a valid image file",
        }));
      }
    }
  };

  const handleNext = () => {
    if (step < 3) setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    // For demonstration, we'll just show an alert
    alert("Organization created successfully!");
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          formData.name &&
          formData.handle &&
          formData.profilePicture &&
          Object.keys(errors).length === 0
        );
      case 2:
        return true; // Privacy selection is always valid
      case 3:
        return validAdmins.length > 0 && invalidAdmins.length === 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0B15] bg-grid-small-white/[0.2] relative flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0F0B15]/80 pointer-events-none" />
      <Card className="w-full max-w-2xl bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10 relative z-10">
        <CardHeader>
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
            Create Your Organization
          </CardTitle>
          <CardDescription className="text-center text-purple-300">
            Step {step} of 3
          </CardDescription>
          <Progress value={step * 33.33} className="w-full h-2 bg-red-500" />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-purple-100">
                    Organization Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-purple-500/10 border-purple-500/20 text-purple-100 placeholder-purple-300"
                    placeholder="Enter organization name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="handle" className="text-purple-100">
                    Handle
                  </Label>
                  <Input
                    id="handle"
                    name="handle"
                    value={formData.handle}
                    onChange={handleInputChange}
                    className="bg-purple-500/10 border-purple-500/20 text-purple-100 placeholder-purple-300"
                    placeholder="Enter organization handle"
                  />
                  {errors.handle && (
                    <p className="text-red-400 text-sm mt-1">{errors.handle}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="profilePicture" className="text-purple-100">
                    Profile Picture
                  </Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      onClick={() =>
                        document.getElementById("profilePicture")?.click()
                      }
                      className="bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      <Upload className="mr-2 h-4 w-4" /> Upload Image
                    </Button>
                    <Input
                      id="profilePicture"
                      name="profilePicture"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {formData.profilePicture && (
                      <p className="text-purple-300">
                        {formData.profilePicture.name}
                      </p>
                    )}
                  </div>
                  {errors.profilePicture && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.profilePicture}
                    </p>
                  )}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <Label className="text-purple-100">Privacy Setting</Label>
                <RadioGroup
                  name="privacy"
                  value={formData.privacy}
                  onValueChange={(value: string) =>
                    setFormData((prev) => ({ ...prev, privacy: value }))
                  }
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="public"
                      id="public"
                      className="border-purple-500"
                    />
                    <Label htmlFor="public" className="text-purple-100">
                      Public
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-purple-400" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-purple-900 text-purple-100">
                          <p>Anyone can view and join your organization</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="private"
                      id="private"
                      className="border-purple-500"
                    />
                    <Label htmlFor="private" className="text-purple-100">
                      Private
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-purple-400" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-purple-900 text-purple-100">
                          <p>
                            Only invited members can view and join your
                            organization
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </RadioGroup>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <Label htmlFor="admins" className="text-purple-100">
                  Add Admins
                </Label>
                <Textarea
                  id="admins"
                  name="admins"
                  value={formData.admins}
                  onChange={handleInputChange}
                  className="bg-purple-500/10 border-purple-500/20 text-purple-100 placeholder-purple-300"
                  placeholder="Enter usernames separated by commas"
                />
                {errors.admins && (
                  <p className="text-red-400 text-sm mt-1">{errors.admins}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {validAdmins.map((admin, index) => (
                    <Badge
                      key={index}
                      className="bg-green-500/20 text-green-300"
                    >
                      {admin}
                    </Badge>
                  ))}
                  {invalidAdmins.map((admin, index) => (
                    <Badge key={index} className="bg-red-500/20 text-red-300">
                      {admin} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={step === 1}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          {step < 3 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              Create Organization
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}