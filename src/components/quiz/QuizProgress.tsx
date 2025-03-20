
import React from "react";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

const QuizProgress = ({ currentStep, totalSteps }: QuizProgressProps) => {
  const calculateProgress = () => {
    return ((currentStep + 1) / totalSteps) * 100;
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-medium">Style Quiz</h2>
        <p className="text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
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
  );
};

export default QuizProgress;
