"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Upload, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Define types for form data and errors
interface Candidate {
  name: string;
  mandate: string;
  profilePicture: File | null;
}

interface FormData {
  name: string;
  description: string;
  startDate: Date | null | "";
  endDate: Date | null | "";
  candidates: Candidate[];
}

interface Errors {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  candidates?: Array<{
    name?: string;
    mandate?: string;
    profilePicture?: string;
  }>;
}

export default function ElectionCreationForm() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    startDate: null,
    endDate: null,
    candidates: [
      { name: "", mandate: "", profilePicture: null },
      { name: "", mandate: "", profilePicture: null },
    ],
  });
  const [errors, setErrors] = useState<Errors>({});

  // Enable dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number | null = null
  ) => {
    const { name, value } = e.target;
    if (index !== null) {
      const newCandidates = [...formData.candidates];
      newCandidates[index] = { ...newCandidates[index], [name]: value };
      setFormData((prev) => ({ ...prev, candidates: newCandidates }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    validateField(name, value, index);
  };

  const validateField = (
    name: string,
    value: string,
    index: number | null = null
  ) => {
    let newErrors: Errors = { ...errors };
    switch (name) {
      case "name":
        if (!value.trim()) newErrors.name = "Election name is required";
        else if (value.length > 100)
          newErrors.name = "Election name must be 100 characters or less";
        else delete newErrors.name;
        break;
      case "description":
        if (!value.trim()) newErrors.description = "Description is required";
        else delete newErrors.description;
        break;
      case "startDate":
      case "endDate":
        if (!value)
          newErrors[name] = `${
            name === "startDate" ? "Start" : "End"
          } date is required`;
        else if (
          formData.startDate &&
          formData.endDate &&
          formData.endDate <= formData.startDate
        ) {
          newErrors.endDate = "End date must be after start date";
        } else {
          delete newErrors.startDate;
          delete newErrors.endDate;
        }
        break;
      default:
        if (index !== null) {
          if (!value.trim()) {
            if (!newErrors.candidates) newErrors.candidates = [];
            if (!newErrors.candidates[index]) newErrors.candidates[index] = {};
            newErrors.candidates[index][
              name as keyof Candidate
            ] = `Candidate ${name} is required`;
          } else {
            if (newErrors.candidates && newErrors.candidates[index]) {
              delete newErrors.candidates[index][name as keyof Candidate];
              if (Object.keys(newErrors.candidates[index]).length === 0) {
                newErrors.candidates = newErrors.candidates.filter(
                  (_, i) => i !== index
                );
                if (newErrors.candidates.length === 0)
                  delete newErrors.candidates;
              }
            }
          }
        }
        break;
    }
    setErrors(newErrors);
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const newCandidates = [...formData.candidates];
      newCandidates[index] = { ...newCandidates[index], profilePicture: file };
      setFormData((prev) => ({ ...prev, candidates: newCandidates }));

      let newErrors = { ...errors };
      if (newErrors.candidates && newErrors.candidates[index]) {
        delete newErrors.candidates[index].profilePicture;
        if (Object.keys(newErrors.candidates[index]).length === 0) {
          newErrors.candidates = newErrors.candidates.filter(
            (_, i) => i !== index
          );
          if (newErrors.candidates.length === 0) delete newErrors.candidates;
        }
      }
      setErrors(newErrors);
    } else {
      let newErrors = { ...errors };
      if (!newErrors.candidates) newErrors.candidates = [];
      if (!newErrors.candidates[index]) newErrors.candidates[index] = {};
      newErrors.candidates[index].profilePicture =
        "Please upload a valid image file";
      setErrors(newErrors);
    }
  };

  const handleAddCandidate = () => {
    setFormData((prev) => ({
      ...prev,
      candidates: [
        ...prev.candidates,
        { name: "", mandate: "", profilePicture: null },
      ],
    }));
  };

  const handleRemoveCandidate = (index: number) => {
    const newCandidates = formData.candidates.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, candidates: newCandidates }));

    let newErrors = { ...errors };
    if (newErrors.candidates) {
      newErrors.candidates = Object.values(newErrors.candidates);
      newErrors.candidates = newErrors.candidates.filter((_, i) => i !== index);
      if (newErrors.candidates.length === 0) delete newErrors.candidates;
    }
    setErrors(newErrors);
  };

  const handleNext = () => {
    if (step < 4) setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    // For demonstration, we'll just show an alert
    alert("Election created successfully!");
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          formData.name &&
          formData.description &&
          !errors.name &&
          !errors.description
        );
      case 2:
        return (
          formData.startDate &&
          formData.endDate &&
          !errors.startDate &&
          !errors.endDate
        );
      case 3:
        return (
          formData.candidates.every(
            (candidate) =>
              candidate.name && candidate.mandate && candidate.profilePicture
          ) && !errors.candidates
        );
      case 4:
        return true; // Review step is always valid if we've made it this far
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
            Create an Election
          </CardTitle>
          <CardDescription className="text-center text-purple-300">
            Step {step} of 4
          </CardDescription>
          <Progress value={step * 25} className="w-full h-2 bg-purple-500/20" />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-purple-100">
                    Election Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-purple-500/10 border-purple-500/20 text-purple-100 placeholder-purple-300"
                    placeholder="Enter election name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="description" className="text-purple-100">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-purple-500/10 border-purple-500/20 text-purple-100 placeholder-purple-300"
                    placeholder="Enter election description"
                  />
                  {errors.description && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="startDate" className="text-purple-100">
                    Start Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? (
                          format(formData.startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          formData.startDate
                            ? new Date(formData.startDate)
                            : undefined
                        }
                        onSelect={(date) => {
                          setFormData((prev) => ({
                            ...prev,
                            startDate: date ? date : null,
                          }));
                          validateField(
                            "startDate",
                            date ? format(date, "yyyy-MM-dd") : ""
                          );
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.startDate && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.startDate}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="endDate" className="text-purple-100">
                    End Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? (
                          format(formData.endDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          formData.endDate
                            ? new Date(formData.endDate)
                            : undefined
                        }
                        onSelect={(date) => {
                          setFormData((prev) => ({
                            ...prev,
                            endDate: date ? date : "",
                          }));
                          validateField(
                            "endDate",
                            date ? format(date, "yyyy-MM-dd") : ""
                          );
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.endDate && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.endDate}
                    </p>
                  )}
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-6">
                <ScrollArea className="h-[400px] pr-4">
                  {formData.candidates.map((candidate, index) => (
                    <div key={index} className="space-y-4 mb-6">
                      <h3 className="text-lg font-semibold text-purple-100">
                        Candidate {index + 1}
                      </h3>
                      <div>
                        <Label
                          htmlFor={`name-${index}`}
                          className="text-purple-100"
                        >
                          Name
                        </Label>
                        <Input
                          id={`name-${index}`}
                          name="name"
                          value={candidate.name}
                          onChange={(e) => handleInputChange(e, index)}
                          className="bg-purple-500/10 border-purple-500/20 text-purple-100 placeholder-purple-300"
                          placeholder="Enter candidate name"
                        />
                        {errors.candidates &&
                          errors.candidates[index] &&
                          errors.candidates[index].name && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.candidates[index].name}
                            </p>
                          )}
                      </div>
                      <div>
                        <Label
                          htmlFor={`mandate-${index}`}
                          className="text-purple-100"
                        >
                          Mandate
                        </Label>
                        <Textarea
                          id={`mandate-${index}`}
                          name="mandate"
                          value={candidate.mandate}
                          onChange={(e) => handleInputChange(e, index)}
                          className="bg-purple-500/10 border-purple-500/20 text-purple-100 placeholder-purple-300"
                          placeholder="Enter candidate mandate"
                        />
                        {errors.candidates &&
                          errors.candidates[index] &&
                          errors.candidates[index].mandate && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.candidates[index].mandate}
                            </p>
                          )}
                      </div>
                      <div>
                        <Label
                          htmlFor={`profilePicture-${index}`}
                          className="text-purple-100"
                        >
                          Profile Picture
                        </Label>
                        <div className="flex items-center space-x-4">
                          <Button
                            type="button"
                            onClick={() => {
                              const input = document.getElementById(
                                `profilePicture-${index}`
                              );
                              if (input) input.click();
                            }}
                            className="bg-purple-500 hover:bg-purple-600 text-white"
                          >
                            <Upload className="mr-2 h-4 w-4" /> Upload Image
                          </Button>
                          <Input
                            id={`profilePicture-${index}`}
                            name="profilePicture"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, index)}
                            className="hidden"
                          />
                          {candidate.profilePicture && (
                            <p className="text-purple-300">
                              {candidate.profilePicture.name}
                            </p>
                          )}
                        </div>
                        {errors.candidates &&
                          errors.candidates[index] &&
                          errors.candidates[index].profilePicture && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.candidates[index].profilePicture}
                            </p>
                          )}
                      </div>
                      {index > 1 && (
                        <Button
                          type="button"
                          onClick={() => handleRemoveCandidate(index)}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Remove Candidate
                        </Button>
                      )}
                      {index < formData.candidates.length - 1 && (
                        <Separator className="my-4 bg-purple-500/20" />
                      )}
                    </div>
                  ))}
                </ScrollArea>
                <Button
                  type="button"
                  onClick={handleAddCandidate}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Another Candidate
                </Button>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-100">
                  Review Election Details
                </h3>
                <div>
                  <p className="text-purple-300">
                    Name:{" "}
                    <span className="text-purple-100">{formData.name}</span>
                  </p>
                  <p className="text-purple-300">
                    Description:{" "}
                    <span className="text-purple-100">
                      {formData.description}
                    </span>
                  </p>
                  <p className="text-purple-300">
                    Start Date:{" "}
                    <span className="text-purple-100">
                      {formData.startDate
                        ? format(formData.startDate, "PPP")
                        : "Not set"}
                    </span>
                  </p>
                  <p className="text-purple-300">
                    End Date:{" "}
                    <span className="text-purple-100">
                      {formData.endDate
                        ? format(formData.endDate, "PPP")
                        : "Not set"}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-purple-100">
                    Candidates:
                  </h4>
                  <ScrollArea className="h-[200px] pr-4">
                    {formData.candidates.map((candidate, index) => (
                      <div key={index} className="mb-2">
                        <p className="text-purple-300">
                          {index + 1}.{" "}
                          <span className="text-purple-100">
                            {candidate.name}
                          </span>
                        </p>
                      </div>
                    ))}
                  </ScrollArea>
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
          {step < 4 ? (
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
              disabled={!isStepValid()}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              Create Election
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
