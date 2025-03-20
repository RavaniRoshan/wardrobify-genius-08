
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { quizQuestions } from "@/utils/styleData";
import FadeIn from "./FadeIn";

interface QuizAnswer {
  questionId: string;
  answerId: string | string[];
}

interface StyleQuizProps {
  onComplete: (answers: QuizAnswer[]) => void;
}

const StyleQuiz = ({ onComplete }: StyleQuizProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string | string[]>("");
  const [gender, setGender] = useState<string>("");
  const [measurements, setMeasurements] = useState({
    height: "",
    weight: "",
    shoeSize: "",
    waist: "",
    chest: "",
    hips: "",
    inseam: "",
    neckSize: ""
  });
  const [occasionPrefs, setOccasionPrefs] = useState<string[]>([]);
  const [colorPrefs, setColorPrefs] = useState<string[]>([]);

  // First check if we need to show gender selection
  const showGenderStep = currentStep === 1;
  // Then measurements
  const showMeasurementsStep = gender !== "" && currentStep === 2;
  // Color preferences
  const showColorStep = showMeasurementsStep && currentStep === 3;
  // Occasion preferences
  const showOccasionStep = showColorStep && currentStep === 4;

  // Modify original questions
  const currentQuestion = quizQuestions[
    gender === "" && currentStep >= 1 ? 0 : currentStep >= 5 ? currentStep - 4 : currentStep
  ];
  
  const isLastQuestion = currentStep === quizQuestions.length + 4 - 1;
  const isMultiSelect = currentQuestion?.type === "multi-select";

  // Gender options
  const genderOptions = [
    { id: "male", name: "Male", description: "Men's fashion styles and sizes" },
    { id: "female", name: "Female", description: "Women's fashion styles and sizes" },
    { id: "unisex", name: "Non-Binary", description: "Gender-neutral fashion styles" }
  ];

  // Color options
  const colorOptions = [
    { id: "black", name: "Black", description: "Timeless and versatile" },
    { id: "white", name: "White", description: "Clean and minimalist" },
    { id: "blue", name: "Blue", description: "Calming and dependable" },
    { id: "red", name: "Red", description: "Bold and passionate" },
    { id: "green", name: "Green", description: "Natural and fresh" },
    { id: "yellow", name: "Yellow", description: "Cheerful and energetic" },
    { id: "purple", name: "Purple", description: "Creative and luxurious" },
    { id: "pink", name: "Pink", description: "Playful and romantic" },
    { id: "brown", name: "Brown", description: "Warm and earthy" },
    { id: "gray", name: "Gray", description: "Neutral and sophisticated" }
  ];

  // Occasion options
  const occasionOptions = [
    { id: "casual", name: "Casual", description: "Everyday comfortable wear" },
    { id: "workOffice", name: "Work/Office", description: "Professional attire" },
    { id: "formal", name: "Formal Events", description: "Elegant and dressy" },
    { id: "dateNight", name: "Date Night", description: "Romantic and stylish" },
    { id: "outdoor", name: "Outdoor Activities", description: "Functional and practical" },
    { id: "workout", name: "Workout", description: "Athletic and comfortable" },
    { id: "beachPool", name: "Beach/Pool", description: "Summer and resort wear" },
    { id: "partyNightOut", name: "Party/Night Out", description: "Fun and eye-catching" }
  ];

  const handleOptionSelect = (optionId: string) => {
    if (isMultiSelect) {
      setSelectedOptions((prev) => {
        const prevArray = Array.isArray(prev) ? prev : [];
        if (prevArray.includes(optionId)) {
          return prevArray.filter((id) => id !== optionId);
        } else {
          return [...prevArray, optionId];
        }
      });
    } else {
      setSelectedOptions(optionId);
    }
  };

  const handleGenderSelect = (genderId: string) => {
    setGender(genderId);
  };

  const handleMeasurementChange = (field: string, value: string) => {
    setMeasurements(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleColorToggle = (colorId: string) => {
    setColorPrefs(prev => {
      if (prev.includes(colorId)) {
        return prev.filter(id => id !== colorId);
      } else {
        return [...prev, colorId];
      }
    });
  };

  const handleOccasionToggle = (occasionId: string) => {
    setOccasionPrefs(prev => {
      if (prev.includes(occasionId)) {
        return prev.filter(id => id !== occasionId);
      } else {
        return [...prev, occasionId];
      }
    });
  };

  const handleNext = () => {
    // Save regular answer
    if (!showGenderStep && !showMeasurementsStep && !showColorStep && !showOccasionStep && currentQuestion) {
      const newAnswer = {
        questionId: currentQuestion.id,
        answerId: selectedOptions,
      };
      
      const updatedAnswers = [...answers];
      updatedAnswers[currentStep] = newAnswer;
      setAnswers(updatedAnswers);
    }
    
    // Save gender answer
    if (showGenderStep) {
      const newAnswer = {
        questionId: "gender",
        answerId: gender,
      };
      
      const updatedAnswers = [...answers];
      updatedAnswers[currentStep] = newAnswer;
      setAnswers(updatedAnswers);
    }
    
    // Save measurements
    if (showMeasurementsStep) {
      const newAnswer = {
        questionId: "measurements",
        answerId: measurements,
      };
      
      const updatedAnswers = [...answers];
      updatedAnswers[currentStep] = newAnswer;
      setAnswers(updatedAnswers);
    }
    
    // Save color preferences
    if (showColorStep) {
      const newAnswer = {
        questionId: "colorPreferences",
        answerId: colorPrefs,
      };
      
      const updatedAnswers = [...answers];
      updatedAnswers[currentStep] = newAnswer;
      setAnswers(updatedAnswers);
    }
    
    // Save occasion preferences
    if (showOccasionStep) {
      const newAnswer = {
        questionId: "occasionPreferences",
        answerId: occasionPrefs,
      };
      
      const updatedAnswers = [...answers];
      updatedAnswers[currentStep] = newAnswer;
      setAnswers(updatedAnswers);
    }

    if (isLastQuestion) {
      onComplete(answers);
    } else {
      // Reset selection for next question if it's not a special step
      if (!showGenderStep && !showMeasurementsStep && !showColorStep && !showOccasionStep) {
        setSelectedOptions(isMultiSelect ? [] : "");
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      
      // Set the selection to the previous answer
      const previousAnswer = answers[currentStep - 1];
      if (previousAnswer && !showGenderStep && !showMeasurementsStep && !showColorStep && !showOccasionStep) {
        setSelectedOptions(previousAnswer.answerId);
      }
    }
  };

  // Determine if next button should be disabled
  const isNextDisabled = () => {
    if (showGenderStep) {
      return gender === "";
    }
    
    if (showMeasurementsStep) {
      // At least height and one other measurement required
      const requiredFields = gender === "male" 
        ? ["height", "chest", "waist"] 
        : ["height", "bust", "waist", "hips"];
      
      return !measurements.height || requiredFields.some(field => 
        !measurements[field as keyof typeof measurements]);
    }
    
    if (showColorStep) {
      return colorPrefs.length === 0;
    }
    
    if (showOccasionStep) {
      return occasionPrefs.length === 0;
    }
    
    // Normal question steps
    return isMultiSelect 
      ? Array.isArray(selectedOptions) && selectedOptions.length === 0 
      : !selectedOptions;
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const totalSteps = quizQuestions.length + 4; // Original + extra steps
    return ((currentStep + 1) / totalSteps) * 100;
  };

  const renderGenderStep = () => (
    <div>
      <h3 className="text-xl font-medium mb-6">Select your gender</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {genderOptions.map((option) => {
          const isSelected = gender === option.id;
          
          return (
            <div
              key={option.id}
              className={`relative cursor-pointer transition-all duration-300 rounded-lg overflow-hidden ${
                isSelected 
                  ? "ring-2 ring-primary scale-[1.02] shadow-md" 
                  : "ring-1 ring-border hover:ring-primary/50"
              }`}
              onClick={() => handleGenderSelect(option.id)}
            >
              <div className="aspect-square bg-secondary/50 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl">
                  {option.id === "male" ? "♂" : option.id === "female" ? "♀" : "⚧"}
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-medium">{option.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {option.description}
                </p>
              </div>
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-primary-foreground"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderMeasurementsStep = () => {
    const isMale = gender === "male";
    
    return (
      <div>
        <h3 className="text-xl font-medium mb-6">Your measurements</h3>
        <p className="text-muted-foreground mb-6">
          This helps us recommend the right fit for your body type. All measurements are in inches.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              type="text"
              placeholder="5'10\""
              value={measurements.height}
              onChange={(e) => handleMeasurementChange("height", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (optional)</Label>
            <Input
              id="weight"
              type="text"
              placeholder="170 lbs"
              value={measurements.weight}
              onChange={(e) => handleMeasurementChange("weight", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={isMale ? "chest" : "bust"}>{isMale ? "Chest" : "Bust"}</Label>
            <Input
              id={isMale ? "chest" : "bust"}
              type="text"
              placeholder="42 inches"
              value={measurements.chest}
              onChange={(e) => handleMeasurementChange("chest", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="waist">Waist</Label>
            <Input
              id="waist"
              type="text"
              placeholder="34 inches"
              value={measurements.waist}
              onChange={(e) => handleMeasurementChange("waist", e.target.value)}
            />
          </div>
          
          {!isMale && (
            <div className="space-y-2">
              <Label htmlFor="hips">Hips</Label>
              <Input
                id="hips"
                type="text"
                placeholder="40 inches"
                value={measurements.hips}
                onChange={(e) => handleMeasurementChange("hips", e.target.value)}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="shoeSize">Shoe Size</Label>
            <Input
              id="shoeSize"
              type="text"
              placeholder={isMale ? "10.5 US Men's" : "8 US Women's"}
              value={measurements.shoeSize}
              onChange={(e) => handleMeasurementChange("shoeSize", e.target.value)}
            />
          </div>
          
          {isMale && (
            <div className="space-y-2">
              <Label htmlFor="neckSize">Neck Size (optional)</Label>
              <Input
                id="neckSize"
                type="text"
                placeholder="16 inches"
                value={measurements.neckSize}
                onChange={(e) => handleMeasurementChange("neckSize", e.target.value)}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="inseam">Inseam (optional)</Label>
            <Input
              id="inseam"
              type="text"
              placeholder="32 inches"
              value={measurements.inseam}
              onChange={(e) => handleMeasurementChange("inseam", e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderColorPreferences = () => (
    <div>
      <h3 className="text-xl font-medium mb-6">Select your preferred colors</h3>
      <p className="text-muted-foreground mb-6">
        Choose as many as you like. These will influence your style recommendations.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {colorOptions.map((color) => {
          const isSelected = colorPrefs.includes(color.id);
          
          return (
            <div
              key={color.id}
              className={`relative cursor-pointer transition-all duration-300 rounded-lg overflow-hidden ${
                isSelected 
                  ? "ring-2 ring-primary scale-[1.02] shadow-md" 
                  : "ring-1 ring-border hover:ring-primary/50"
              }`}
              onClick={() => handleColorToggle(color.id)}
            >
              <div
                className="aspect-square flex items-center justify-center"
                style={{ backgroundColor: color.id === "white" ? "#f8f8f8" : color.id }}
              >
                {color.id === "white" && (
                  <span className="text-black text-opacity-70">White</span>
                )}
              </div>
              <div className="p-3 bg-card">
                <h4 className="font-medium text-sm">{color.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {color.description}
                </p>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3 text-primary-foreground"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderOccasionPreferences = () => (
    <div>
      <h3 className="text-xl font-medium mb-6">What occasions are you dressing for?</h3>
      <p className="text-muted-foreground mb-6">
        Select all that apply. Your recommendations will focus on these situations.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {occasionOptions.map((option) => {
          const isSelected = occasionPrefs.includes(option.id);
          
          return (
            <div
              key={option.id}
              className={`relative cursor-pointer transition-all duration-300 rounded-lg overflow-hidden ${
                isSelected 
                  ? "ring-2 ring-primary scale-[1.02] shadow-md" 
                  : "ring-1 ring-border hover:ring-primary/50"
              }`}
              onClick={() => handleOccasionToggle(option.id)}
            >
              <div className="p-4">
                <h4 className="font-medium">{option.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {option.description}
                </p>
              </div>
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-primary-foreground"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-medium">Style Quiz</h2>
            <p className="text-muted-foreground">
              Step {currentStep + 1} of {quizQuestions.length + 4}
            </p>
          </div>
          <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out-expo"
              style={{ 
                width: `${calculateProgress()}%` 
              }}
            ></div>
          </div>
        </div>

        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-md">
          <CardContent className="p-8">
            {showGenderStep ? (
              renderGenderStep()
            ) : showMeasurementsStep ? (
              renderMeasurementsStep()
            ) : showColorStep ? (
              renderColorPreferences()
            ) : showOccasionStep ? (
              renderOccasionPreferences()
            ) : (
              <>
                <h3 className="text-xl font-medium mb-6">{currentQuestion.question}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {currentQuestion.options.map((option) => {
                    const isSelected = isMultiSelect
                      ? Array.isArray(selectedOptions) && selectedOptions.includes(option.id)
                      : selectedOptions === option.id;
                    
                    return (
                      <div
                        key={option.id}
                        className={`relative cursor-pointer transition-all duration-300 rounded-lg overflow-hidden ${
                          isSelected 
                            ? "ring-2 ring-primary scale-[1.02] shadow-md" 
                            : "ring-1 ring-border hover:ring-primary/50"
                        }`}
                        onClick={() => handleOptionSelect(option.id)}
                      >
                        <div className="aspect-[4/3] bg-secondary/50 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                            {option.id.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium">{option.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {option.description}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4 text-primary-foreground"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            <div className="flex justify-between pt-2">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`${
                  currentStep === 0 ? "opacity-0 pointer-events-none" : ""
                }`}
              >
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={isNextDisabled()}
                className="px-8 rounded-full"
              >
                {isLastQuestion ? "Complete" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default StyleQuiz;
