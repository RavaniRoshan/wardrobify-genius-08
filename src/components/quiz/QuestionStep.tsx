
import React from "react";
import OptionCard from "./OptionCard";

interface QuestionOption {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export interface Question {
  title: string;
  description: string;
  question?: string;
  options?: QuestionOption[];
  type?: string;
}

interface QuestionStepProps {
  question: Question;
  selectedOptions: string | string[];
  onOptionSelect: (optionId: string) => void;
  isMultiSelect: boolean;
}

const QuestionStep: React.FC<QuestionStepProps> = ({ 
  question, 
  selectedOptions, 
  onOptionSelect,
  isMultiSelect
}: QuestionStepProps) => {
  const options = question.options || [
    { id: "option1", name: "Option 1", description: "Description for option 1" },
    { id: "option2", name: "Option 2", description: "Description for option 2" },
    { id: "option3", name: "Option 3", description: "Description for option 3" }
  ];

  return (
    <>
      <h3 className="text-xl font-medium mb-6">{question.question || question.title}</h3>
      <p className="text-muted-foreground mb-6">{question.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {options.map((option) => {
          const isSelected = isMultiSelect
            ? Array.isArray(selectedOptions) && selectedOptions.includes(option.id)
            : selectedOptions === option.id;
          
          return (
            <OptionCard
              key={option.id}
              id={option.id}
              name={option.name}
              description={option.description}
              isSelected={isSelected}
              onClick={() => onOptionSelect(option.id)}
              aspectRatio="aspect-[4/3]"
              image={option.image}
              icon={!option.image ? option.id.charAt(0).toUpperCase() : undefined}
            />
          );
        })}
      </div>
    </>
  );
};

export default QuestionStep;
