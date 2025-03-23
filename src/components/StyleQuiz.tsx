
import React, { useState } from 'react';
import QuizProgress from './quiz/QuizProgress';
import GenderStep from './quiz/GenderStep';
import OccasionPreferencesStep from './quiz/OccasionPreferencesStep';
import ColorPreferencesStep from './quiz/ColorPreferencesStep';
import MeasurementsStep from './quiz/MeasurementsStep';
import QuestionStep from './quiz/QuestionStep';
import { Button } from './ui/button';
import FadeIn from './FadeIn';
import { Question } from './quiz/QuestionStep';

// Define proper types to match the props expected by imported components
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
    description: "This helps us understand your preferences better."
  };

  const question2: Question = {
    title: "What is your preferred style aesthetic?",
    description: "This helps us tailor our recommendations to your taste."
  };

  return (
    <FadeIn>
      <div className="bg-background rounded-lg shadow-md p-8 myntra-card">
        <QuizProgress currentStep={step} totalSteps={totalSteps} />

        {step === 1 && (
          <GenderStep
            selectedGender={userSelections.gender}
            onChange={(value) => handleInputChange('gender', value)}
          />
        )}

        {step === 2 && (
          <OccasionPreferencesStep
            selected={userSelections.occasionPreferences}
            onChange={(value) => handleInputChange('occasionPreferences', value)}
          />
        )}

        {step === 3 && (
          <ColorPreferencesStep
            selected={userSelections.colorPreferences}
            onChange={(value) => handleInputChange('colorPreferences', value)}
          />
        )}

        {step === 4 && (
          <MeasurementsStep
            measurements={userSelections.measurements}
            onMeasurementChange={(value) => handleInputChange('measurements', value)}
          />
        )}

        {step === 5 && (
          <QuestionStep
            question={question1}
            field="question1"
            answer={userSelections.question1}
            onChange={(value) => handleInputChange('question1', value)}
          />
        )}

        {step === 6 && (
          <QuestionStep
            question={question2}
            field="question2"
            answer={userSelections.question2}
            onChange={(value) => handleInputChange('question2', value)}
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
