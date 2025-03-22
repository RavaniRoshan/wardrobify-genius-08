import React, { useState } from 'react';
import QuizProgress from './quiz/QuizProgress';
import GenderStep from './quiz/GenderStep';
import OccasionPreferencesStep from './quiz/OccasionPreferencesStep';
import ColorPreferencesStep from './quiz/ColorPreferencesStep';
import MeasurementsStep from './quiz/MeasurementsStep';
import QuestionStep from './quiz/QuestionStep';
import { Button } from './ui/button';
import FadeIn from './FadeIn';
import { type SetStateAction } from 'react';

interface UserSelections {
  gender?: string;
  occasionPreferences?: string[];
  colorPreferences?: string[];
  measurements?: Record<string, string>;
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

  const handleInputChange = (field: string, value: string | string[] | Record<string, string>) => {
    if (field === 'measurements') {
      // Handle measurements as an object with specific type handling
      setUserSelections((prev) => ({
        ...prev,
        [field]: value as Record<string, string>,
      }));
    } else {
      // Handle other fields (string or string[])
      setUserSelections((prev) => ({
        ...prev,
        [field]: value as SetStateAction<string | string[]>,
      }));
    }
  };

  return (
    <FadeIn>
      <div className="bg-background rounded-lg shadow-md p-8">
        <QuizProgress currentStep={step} totalSteps={totalSteps} />

        {step === 1 && (
          <GenderStep
            value={userSelections.gender}
            onChange={(value) => handleInputChange('gender', value)}
            onNext={nextStep}
          />
        )}

        {step === 2 && (
          <OccasionPreferencesStep
            value={userSelections.occasionPreferences}
            onChange={(value) => handleInputChange('occasionPreferences', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}

        {step === 3 && (
          <ColorPreferencesStep
            value={userSelections.colorPreferences}
            onChange={(value) => handleInputChange('colorPreferences', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}

        {step === 4 && (
          <MeasurementsStep
            value={userSelections.measurements}
            onChange={(value) => handleInputChange('measurements', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}

        {step === 5 && (
          <QuestionStep
            question="What is your favorite type of clothing?"
            field="question1"
            value={userSelections.question1}
            onChange={(value) => handleInputChange('question1', value)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}

        {step === 6 && (
          <QuestionStep
            question="What is your preferred style aesthetic?"
            field="question2"
            value={userSelections.question2}
            onChange={(value) => handleInputChange('question2', value)}
            onNext={() => {
              handleInputChange('question3', 'value3');
              handleSubmit();
            }}
            onPrev={prevStep}
          />
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && step <=5 && (
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          {step === totalSteps && (
            <Button onClick={handleSubmit}>
              Complete
            </Button>
          )}
        </div>
      </div>
    </FadeIn>
  );
};

export default StyleQuiz;
