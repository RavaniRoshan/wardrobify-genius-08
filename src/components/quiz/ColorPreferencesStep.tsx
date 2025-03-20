
import React from "react";
import OptionCard from "./OptionCard";

interface ColorOption {
  id: string;
  name: string;
  description: string;
}

interface ColorPreferencesStepProps {
  colorOptions: ColorOption[];
  selectedColors: string[];
  onColorToggle: (colorId: string) => void;
}

const ColorPreferencesStep = ({ 
  colorOptions, 
  selectedColors, 
  onColorToggle 
}: ColorPreferencesStepProps) => {
  return (
    <div>
      <h3 className="text-xl font-medium mb-6">Select your preferred colors</h3>
      <p className="text-muted-foreground mb-6">
        Choose as many as you like. These will influence your style recommendations.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {colorOptions.map((color) => {
          const isSelected = selectedColors.includes(color.id);
          
          return (
            <OptionCard
              key={color.id}
              id={color.id}
              name={color.name}
              description={color.description}
              isSelected={isSelected}
              onClick={() => onColorToggle(color.id)}
              aspectRatio="aspect-square"
              backgroundColor={color.id === "white" ? "#f8f8f8" : color.id}
              showCheckmark={isSelected}
              checkmarkPosition={{ top: "2", right: "2" }}
              checkmarkSize={{ width: "5", height: "5" }}
              icon={color.id === "white" ? (
                <span className="text-black text-opacity-70">White</span>
              ) : undefined}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColorPreferencesStep;
