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
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { stringify } from "postcss";
interface Err {
  name?: string;
  description?: string;
  voteOptions?: any;
}
export default function ProposalCreationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    voteOptions: [
      { id: 1, value: "Yes" },
      { id: 2, value: "No" },
    ],
  });
  const [errors, setErrors] = useState<Err>({
    name: "",
    description: "",
    voteOptions: [],
  });

  // Enable dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index = null
  ) => {
    const { name, value } = e.target;
    if (index !== null) {
      const newVoteOptions = [...formData.voteOptions];
      newVoteOptions[index] = { ...newVoteOptions[index], value: value };
      setFormData((prev) => ({ ...prev, voteOptions: newVoteOptions }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    validateField(name, value, index);
  };

  const validateField = (name: string, value: string, index = null) => {
    let newErrors = { ...errors };
    switch (name) {
      case "name":
        if (!value.trim()) newErrors.name = "Proposal name is required";
        else if (value.length > 100)
          newErrors.name = "Proposal name must be 100 characters or less";
        else if (newErrors.name) {
          delete newErrors.name;
        }
        break;
      case "description":
        if (!value.trim()) newErrors.description = "Description is required";
        else if (newErrors.description) {
          delete newErrors.description;
        }
        break;
      default:
        if (index !== null) {
          if (!value.trim()) {
            if (!newErrors.voteOptions) newErrors.voteOptions = [];
            newErrors.voteOptions[index] = "Vote option is required";
          } else {
            if (newErrors.voteOptions) {
              if (newErrors.voteOptions) {
                delete newErrors.voteOptions[index];
                if (newErrors.voteOptions.filter(Boolean).length === 0)
                  delete newErrors.voteOptions;
              }
            }
          }
        }
        break;
    }
    setErrors(newErrors);
  };

  const handleAddVoteOption = () => {
    setFormData((prev) => ({
      ...prev,
      voteOptions: [...prev.voteOptions, { id: Date.now(), value: "" }],
    }));
  };

  const handleRemoveVoteOption = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      voteOptions: prev.voteOptions.filter((option) => option.id !== id),
    }));
    let newErrors = { ...errors };
    if (newErrors.voteOptions) {
      newErrors.voteOptions = newErrors.voteOptions.filter(
        (error: string, index: number) => formData.voteOptions[index].id !== id
      );
      if (
        newErrors.voteOptions &&
        newErrors.voteOptions.filter(Boolean).length === 0
      )
        delete newErrors.voteOptions;
    }
    setErrors(newErrors);
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
    alert("Proposal created successfully!");
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
          formData.voteOptions.length >= 2 &&
          formData.voteOptions.every((option) => option.value.trim()) &&
          !errors.voteOptions
        );
      case 3:
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
            Create a Proposal
          </CardTitle>
          <CardDescription className="text-center text-purple-300">
            Step {step} of 3
          </CardDescription>
          <Progress
            value={step * 33.33}
            className="w-full h-2 bg-purple-500/20"
          />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-purple-100">
                    Proposal Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-purple-500/10 border-purple-500/20 text-purple-100 placeholder-purple-300"
                    placeholder="Enter proposal name"
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
                    placeholder="Enter proposal description"
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
                <Label className="text-purple-100">Vote Options</Label>
                <ScrollArea className="h-[300px] pr-4">
                  {formData.voteOptions.map((option, index) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <Input
                        value={option.value}
                        onChange={(e) => handleInputChange(e, index as number)}
                        className="bg-purple-500/10 border-purple-500/20 text-purple-100 placeholder-purple-300"
                        placeholder={`Option ${index + 1}`}
                      />
                      {index > 0 && (
                        <Button
                          type="button"
                          onClick={() => handleRemoveVoteOption(option.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </ScrollArea>
                {errors.voteOptions && (
                  <p className="text-red-400 text-sm mt-1">
                    All vote options are required
                  </p>
                )}
                <Button
                  type="button"
                  onClick={handleAddVoteOption}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Another Option
                </Button>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-100">
                  Review Proposal Details
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
                </div>
                <div>
                  <h4 className="text-md font-semibold text-purple-100">
                    Vote Options:
                  </h4>
                  <ul className="list-disc list-inside text-purple-300">
                    {formData.voteOptions.map((option, index) => (
                      <li key={option.id}>
                        <span className="text-purple-100">{option.value}</span>
                      </li>
                    ))}
                  </ul>
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
              Create Proposal
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
