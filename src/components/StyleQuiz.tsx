
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

  const currentQuestion = quizQuestions[currentStep];
  const isLastQuestion = currentStep === quizQuestions.length - 1;
  const isMultiSelect = currentQuestion?.type === "multi-select";

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

  const handleNext = () => {
    // Save answer
    const newAnswer = {
      questionId: currentQuestion.id,
      answerId: selectedOptions,
    };
    
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = newAnswer;
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      onComplete(updatedAnswers);
    } else {
      // Reset selection for next question
      setSelectedOptions(isMultiSelect ? [] : "");
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Set the selection to the previous answer
      const previousAnswer = answers[currentStep - 1];
      if (previousAnswer) {
        setSelectedOptions(previousAnswer.answerId);
      }
    }
  };

  // Determine if next button should be disabled
  const isNextDisabled = isMultiSelect 
    ? Array.isArray(selectedOptions) && selectedOptions.length === 0 
    : !selectedOptions;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-medium">Style Quiz</h2>
            <p className="text-muted-foreground">
              Step {currentStep + 1} of {quizQuestions.length}
            </p>
          </div>
          <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out-expo"
              style={{ 
                width: `${((currentStep + 1) / quizQuestions.length) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-md">
          <CardContent className="p-8">
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
                disabled={isNextDisabled}
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
