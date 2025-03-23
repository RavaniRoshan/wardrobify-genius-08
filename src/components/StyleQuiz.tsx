
import React, { useState } from 'react';
import QuizProgress from './quiz/QuizProgress';
import GenderStep from './quiz/GenderStep';
import OccasionPreferencesStep from './quiz/OccasionPreferencesStep';
import ColorPreferencesStep from './quiz/ColorPreferencesStep';
import MeasurementsStep from './quiz/MeasurementsStep';
import QuestionStep from './quiz/QuestionStep';
import { Button } from './ui/button';
import FadeIn from './FadeIn';

// Define proper types to match the props expected by imported components
export interface Question {
  title: string;
  description: string;
  question?: string;
  options?: Array<{
    id: string;
    name: string;
    description: string;
    image?: string;
  }>;
  type?: string;
}

interface UserSelections {
  gender?: string;
  occasionPreferences?: string[];
  colorPreferences?: string[];
  measurements?: any;
  question1?: string;
  question2?: string;
  question3?: string;
}

interface StyleQuizProps {
  onComplete: (answers: any[]) => void;
}

const StyleQuiz: React.FC<StyleQuizProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [userSelections, setUserSelections] = useState<UserSelections>({});

  const totalSteps = 6;

  const nextStep = () => {
    setStep(prevStep => Math.min(prevStep + 1, totalSteps));
  };

  const prevStep = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = () => {
    onComplete([
      userSelections.gender,
      userSelections.occasionPreferences,
      userSelections.colorPreferences,
      userSelections.measurements,
      userSelections.question1,
      userSelections.question2,
      userSelections.question3,
    ]);
  };

  const handleInputChange = (field: string, value: any) => {
    setUserSelections((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const question1: Question = {
    title: "What is your favorite type of clothing?",
    description: "This helps us understand your preferences better.",
    question: "What is your favorite type of clothing?",
    options: [
      { id: "casual", name: "Casual", description: "Everyday comfortable wear" },
      { id: "formal", name: "Formal", description: "Professional attire" },
      { id: "athletic", name: "Athletic", description: "Sports and workout clothes" }
    ],
    type: "single"
  };

  const question2: Question = {
    title: "What is your preferred style aesthetic?",
    description: "This helps us tailor our recommendations to your taste.",
    question: "What is your preferred style aesthetic?",
    options: [
      { id: "minimalist", name: "Minimalist", description: "Clean and simple designs" },
      { id: "vintage", name: "Vintage", description: "Classic retro styles" },
      { id: "trendy", name: "Trendy", description: "Latest fashion trends" }
    ],
    type: "single"
  };

  // Mock data for the components
  const genderOptions = [
    { id: "male", name: "Male", description: "Men's fashion" },
    { id: "female", name: "Female", description: "Women's fashion" },
    { id: "other", name: "Non-binary", description: "Gender-neutral fashion" }
  ];

  const occasionOptions = [
    { id: "casual", name: "Casual", description: "Everyday wear" },
    { id: "work", name: "Work", description: "Professional attire" },
    { id: "formal", name: "Formal Events", description: "Special occasions" },
    { id: "athletic", name: "Athletic", description: "Workout and sports" },
    { id: "nightOut", name: "Night Out", description: "Evening activities" }
  ];

  const colorOptions = [
    { id: "black", name: "Black", description: "Versatile and slimming" },
    { id: "blue", name: "Blue", description: "Calming and classic" },
    { id: "white", name: "White", description: "Clean and fresh" },
    { id: "red", name: "Red", description: "Bold and vibrant" },
    { id: "green", name: "Green", description: "Natural and refreshing" }
  ];

  return (
    <FadeIn>
      <div className="bg-background rounded-lg shadow-md p-8 myntra-card">
        <QuizProgress currentStep={step} totalSteps={totalSteps} />

        {step === 1 && (
          <GenderStep
            genderOptions={genderOptions}
            selectedGender={userSelections.gender || ""}
            onGenderSelect={(value) => handleInputChange('gender', value)}
          />
        )}

        {step === 2 && (
          <OccasionPreferencesStep
            occasionOptions={occasionOptions}
            selectedOccasions={userSelections.occasionPreferences || []}
            onOccasionToggle={(value) => handleInputChange('occasionPreferences', 
              userSelections.occasionPreferences?.includes(value) 
                ? userSelections.occasionPreferences.filter(item => item !== value)
                : [...(userSelections.occasionPreferences || []), value]
            )}
          />
        )}

        {step === 3 && (
          <ColorPreferencesStep
            colorOptions={colorOptions}
            selectedColors={userSelections.colorPreferences || []}
            onColorToggle={(value) => handleInputChange('colorPreferences', 
              userSelections.colorPreferences?.includes(value) 
                ? userSelections.colorPreferences.filter(item => item !== value)
                : [...(userSelections.colorPreferences || []), value]
            )}
          />
        )}

        {step === 4 && (
          <MeasurementsStep
            measurements={userSelections.measurements || {}}
            gender={userSelections.gender || ""}
            onMeasurementChange={(field, value) => {
              const updatedMeasurements = {
                ...(userSelections.measurements || {}),
                [field]: value
              };
              handleInputChange('measurements', updatedMeasurements);
            }}
          />
        )}

        {step === 5 && (
          <QuestionStep
            question={question1}
            selectedOptions={userSelections.question1 || ""}
            onOptionSelect={(value) => handleInputChange('question1', value)}
            isMultiSelect={false}
          />
        )}

        {step === 6 && (
          <QuestionStep
            question={question2}
            selectedOptions={userSelections.question2 || ""}
            onOptionSelect={(value) => handleInputChange('question2', value)}
            isMultiSelect={false}
          />
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button variant="myntraOutline" onClick={prevStep}>
              Previous
            </Button>
          )}
          {step < totalSteps && (
            <Button variant="myntra" onClick={nextStep} className="ml-auto">
              Next
            </Button>
          )}
          {step === totalSteps && (
            <Button variant="myntra" onClick={handleSubmit} className="ml-auto">
              Complete
            </Button>
          )}
        </div>
      </div>
    </FadeIn>
  );
};

export default StyleQuiz;
