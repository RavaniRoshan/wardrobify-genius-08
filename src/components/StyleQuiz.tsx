
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
interface UserSelections {
  gender?: string;
  occasionPreferences?: string[];
  colorPreferences?: string[];
  measurements?: any; // Using any temporarily to fix the type error
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

  return (
    <FadeIn>
      <div className="bg-background rounded-lg shadow-md p-8 myntra-card">
        <QuizProgress currentStep={step} totalSteps={totalSteps} />

        {step === 1 && (
          <GenderStep
            selectedGender={userSelections.gender}
            onGenderSelect={(value) => handleInputChange('gender', value)}
            onNext={nextStep}
          />
        )}

        {step === 2 && (
          <OccasionPreferencesStep
            selectedOccasions={userSelections.occasionPreferences}
            onOccasionsSelect={(value) => handleInputChange('occasionPreferences', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}

        {step === 3 && (
          <ColorPreferencesStep
            selectedColors={userSelections.colorPreferences}
            onColorsSelect={(value) => handleInputChange('colorPreferences', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}

        {step === 4 && (
          <MeasurementsStep
            measurements={userSelections.measurements}
            onMeasurementsChange={(value) => handleInputChange('measurements', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}

        {step === 5 && (
          <QuestionStep
            question="What is your favorite type of clothing?"
            field="question1"
            answer={userSelections.question1}
            onChange={(value) => handleInputChange('question1', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}

        {step === 6 && (
          <QuestionStep
            question="What is your preferred style aesthetic?"
            field="question2"
            answer={userSelections.question2}
            onChange={(value) => handleInputChange('question2', value)}
            onNext={() => {
              handleInputChange('question3', 'value3');
              handleSubmit();
            }}
            onPrev={prevStep}
          />
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && step <= 5 && (
            <Button variant="myntraOutline" onClick={prevStep}>
              Previous
            </Button>
          )}
          {step === totalSteps && (
            <Button variant="myntra" onClick={handleSubmit}>
              Complete
            </Button>
          )}
        </div>
      </div>
    </FadeIn>
  );
};

export default StyleQuiz;
