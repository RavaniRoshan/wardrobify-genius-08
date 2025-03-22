
import React from "react";

interface OptionCardProps {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  image?: string;
  aspectRatio?: string;
  showCheckmark?: boolean;
  checkmarkPosition?: { top: string; right: string };
  checkmarkSize?: { width: string; height: string };
  iconSize?: { width: string; height: string };
  backgroundColor?: string;
}

const OptionCard = ({
  id,
  name,
  description,
  isSelected,
  onClick,
  icon,
  image,
  aspectRatio = "aspect-[4/3]",
  showCheckmark = true,
  checkmarkPosition = { top: "3", right: "3" },
  checkmarkSize = { width: "6", height: "6" },
  iconSize = { width: "12", height: "12" },
  backgroundColor
}: OptionCardProps) => {
  return (
    <div
      key={id}
      className={`relative cursor-pointer transition-all duration-300 rounded-lg overflow-hidden ${
        isSelected 
          ? "ring-2 ring-myntra-purple scale-[1.02] shadow-md" 
          : "ring-1 ring-border hover:ring-myntra-purple/50"
      }`}
      onClick={onClick}
    >
      <div className={`${aspectRatio} bg-myntra-gray/50 flex items-center justify-center`}>
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : icon ? (
          <div 
            className={`w-${iconSize.width} h-${iconSize.height} rounded-full bg-myntra-gray flex items-center justify-center`}
            style={backgroundColor ? { backgroundColor } : undefined}
          >
            {icon}
          </div>
        ) : null}
      </div>
      <div className="p-4">
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-muted-foreground mt-1">
          {description}
        </p>
      </div>
      {isSelected && showCheckmark && (
        <div className={`absolute top-${checkmarkPosition.top} right-${checkmarkPosition.right} w-${checkmarkSize.width} h-${checkmarkSize.height} bg-myntra-purple rounded-full flex items-center justify-center`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-${parseInt(checkmarkSize.width) - 2} h-${parseInt(checkmarkSize.height) - 2} text-white`}
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
};

export default OptionCard;
