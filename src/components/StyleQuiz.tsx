
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { quizQuestions } from "@/utils/styleData";
import FadeIn from "./FadeIn";
import QuizProgress from "./quiz/QuizProgress";
import GenderStep from "./quiz/GenderStep";
import MeasurementsStep from "./quiz/MeasurementsStep";
import ColorPreferencesStep from "./quiz/ColorPreferencesStep";
import OccasionPreferencesStep from "./quiz/OccasionPreferencesStep";
import QuestionStep from "./quiz/QuestionStep";

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
  
  const totalSteps = quizQuestions.length + 4; // Original + extra steps
  const isLastQuestion = currentStep === totalSteps - 1;
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <FadeIn>
        <QuizProgress 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
        />

        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-md">
          <CardContent className="p-8">
            {showGenderStep ? (
              <GenderStep 
                genderOptions={genderOptions}
                selectedGender={gender}
                onGenderSelect={handleGenderSelect}
              />
            ) : showMeasurementsStep ? (
              <MeasurementsStep
                measurements={measurements}
                gender={gender}
                onMeasurementChange={handleMeasurementChange}
              />
            ) : showColorStep ? (
              <ColorPreferencesStep
                colorOptions={colorOptions}
                selectedColors={colorPrefs}
                onColorToggle={handleColorToggle}
              />
            ) : showOccasionStep ? (
              <OccasionPreferencesStep
                occasionOptions={occasionOptions}
                selectedOccasions={occasionPrefs}
                onOccasionToggle={handleOccasionToggle}
              />
            ) : (
              <QuestionStep
                question={currentQuestion}
                selectedOptions={selectedOptions}
                onOptionSelect={handleOptionSelect}
                isMultiSelect={isMultiSelect}
              />
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
