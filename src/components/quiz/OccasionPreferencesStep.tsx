
import React from "react";
import OptionCard from "./OptionCard";

interface OccasionOption {
  id: string;
  name: string;
  description: string;
}

interface OccasionPreferencesStepProps {
  occasionOptions: OccasionOption[];
  selectedOccasions: string[];
  onOccasionToggle: (occasionId: string) => void;
}

const OccasionPreferencesStep = ({ 
  occasionOptions, 
  selectedOccasions, 
  onOccasionToggle 
}: OccasionPreferencesStepProps) => {
  return (
    <div>
      <h3 className="text-xl font-medium mb-6">What occasions are you dressing for?</h3>
      <p className="text-muted-foreground mb-6">
        Select all that apply. Your recommendations will focus on these situations.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {occasionOptions.map((option) => {
          const isSelected = selectedOccasions.includes(option.id);
          
          return (
            <OptionCard
              key={option.id}
              id={option.id}
              name={option.name}
              description={option.description}
              isSelected={isSelected}
              onClick={() => onOccasionToggle(option.id)}
              icon={undefined}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OccasionPreferencesStep;
