
import React from "react";
import OptionCard from "./OptionCard";

interface GenderOption {
  id: string;
  name: string;
  description: string;
}

interface GenderStepProps {
  genderOptions: GenderOption[];
  selectedGender: string;
  onGenderSelect: (genderId: string) => void;
}

const GenderStep = ({ 
  genderOptions, 
  selectedGender, 
  onGenderSelect 
}: GenderStepProps) => {
  return (
    <div>
      <h3 className="text-xl font-medium mb-6">Select your gender</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {genderOptions.map((option) => {
          const isSelected = selectedGender === option.id;
          
          return (
            <OptionCard
              key={option.id}
              id={option.id}
              name={option.name}
              description={option.description}
              isSelected={isSelected}
              onClick={() => onGenderSelect(option.id)}
              aspectRatio="aspect-square"
              icon={
                <span className="text-2xl">
                  {option.id === "male" ? "♂" : option.id === "female" ? "♀" : "⚧"}
                </span>
              }
              iconSize={{ width: "16", height: "16" }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GenderStep;
